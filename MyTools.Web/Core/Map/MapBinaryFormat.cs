using System;
using System.Buffers.Binary;
using System.Collections.Generic;

namespace MyTools.Map
{
    // Reads/writes the real RPGWO server .map world-file binary format. Ported byte-for-byte
    // from the reference tool's parseMapFile/buildMapFile/parseMapItemRecord/writeMapItemRecord
    // (confirmed against its source - all multi-byte fields are little-endian). Preserves each
    // item/monster record's exact original bytes unless the editor actually touched it, so files
    // round-trip losslessly for anything this format doesn't otherwise interpret.
    public static class MapBinaryFormat
    {
        public const int ItemRecordSize = 345;
        public const int MonsterRecordSize = 41;

        public static MapDocument Parse(byte[] bytes, string name)
        {
            int width = ReadI16(bytes, 0);
            int height = ReadI16(bytes, 2);
            string version = ReadFixedString(bytes, 4, 30);
            bool sparseSurfaceArray = ReadI16(bytes, 34) == -1;

            MapDocument map = new()
            {
                name = name,
                width = width,
                height = height,
                version = version
            };

            int off = 100;

            if (sparseSurfaceArray)
            {
                uint count = ReadU32(bytes, off);
                off += 4;

                for (uint n = 0; n < count; n++)
                {
                    int x = ReadI16(bytes, off);
                    int y = ReadI16(bytes, off + 2);
                    int surface = ReadI16(bytes, off + 4);
                    off += 6;

                    if (surface != 0)
                        map.surfaces[(x, y)] = surface;
                }
            }
            else
            {
                for (int x = 1; x <= width; x++)
                {
                    for (int y = 1; y <= height; y++)
                    {
                        int surface = ReadI16(bytes, off);
                        off += 2;

                        if (surface != 0)
                            map.surfaces[(x, y)] = surface;
                    }
                }
            }

            bool v2 = version.StartsWith("2.0", StringComparison.Ordinal);
            long itemCount = v2 ? ReadI32(bytes, off) : ReadI16(bytes, off);
            off += v2 ? 4 : 2;

            for (long n = 0; n < itemCount; n++)
            {
                if (off + ItemRecordSize > bytes.Length)
                    break;

                MapItemRecord item = ParseItemRecord(bytes, off);
                off += ItemRecordSize;

                if (item.itemId != 0)
                    map.items[(item.x, item.y)] = item;
            }

            long monsterCount = v2 ? ReadI32(bytes, off) : ReadI16(bytes, off);
            off += v2 ? 4 : 2;

            for (long n = 0; n < monsterCount; n++)
            {
                if (off + MonsterRecordSize > bytes.Length)
                    break;

                MapMonsterRecord monster = ParseMonsterRecord(bytes, off);
                off += MonsterRecordSize;

                if (monster.monsterId != 0)
                    map.monsters[(monster.x, monster.y)] = monster;
            }

            if (off + 2 <= bytes.Length)
            {
                int notesLength = ReadI16(bytes, off);
                off += 2;

                if (notesLength > 0 && off < bytes.Length)
                {
                    map.notes = ReadFixedString(bytes, off, Math.Min(notesLength, bytes.Length - off));
                }
            }

            return map;
        }

        private static MapItemRecord ParseItemRecord(byte[] bytes, int off) => new()
        {
            rawRecord = bytes[off..(off + ItemRecordSize)],
            dirty = false,
            itemId = ReadI16(bytes, off + 4),
            x = ReadI16(bytes, off + 6),
            y = ReadI16(bytes, off + 8),
            data1 = ReadI16(bytes, off + 10),
            data2 = ReadI16(bytes, off + 12),
            data3 = ReadI16(bytes, off + 14),
            data4 = ReadI16(bytes, off + 16),
            data5 = ReadI16(bytes, off + 18),
            reset = ReadI16(bytes, off + 34),
            uses = ReadI16(bytes, off + 36),
            trigger = ReadI16(bytes, off + 38),
            timeout = ReadF32(bytes, off + 40),
            text = ReadFixedString(bytes, off + 44, 200),
            putIn = ReadI16(bytes, off + 246)
        };

        private static MapMonsterRecord ParseMonsterRecord(byte[] bytes, int off) => new()
        {
            rawRecord = bytes[off..(off + MonsterRecordSize)],
            dirty = false,
            monsterId = ReadI16(bytes, off + 2),
            x = ReadI16(bytes, off + 4),
            y = ReadI16(bytes, off + 6),
            timeout = ReadI16(bytes, off + 8)
        };

        public static byte[] Build(MapDocument map)
        {
            bool v2 = (map.version ?? "").StartsWith("2.0", StringComparison.Ordinal);

            List<((int x, int y) key, int surface)> surfaceRecords = new();
            foreach (KeyValuePair<(int x, int y), int> entry in map.surfaces)
            {
                if (entry.Value != 0)
                    surfaceRecords.Add((entry.Key, entry.Value));
            }

            List<MapItemRecord> itemRecords = new(map.items.Values);
            List<MapMonsterRecord> monsterRecords = new(map.monsters.Values);

            int countSize = v2 ? 4 : 2;
            int size = 100 + 4 + surfaceRecords.Count * 6 + countSize + itemRecords.Count * ItemRecordSize
                + countSize + monsterRecords.Count * MonsterRecordSize + 2 + 5000;

            byte[] bytes = new byte[size];
            int off = 0;

            WriteI16(bytes, off, (short)map.width); off += 2;
            WriteI16(bytes, off, (short)map.height); off += 2;
            WriteFixedString(bytes, off, 30, map.version ?? "2.0       RPGWO Edit"); off += 30;
            WriteI16(bytes, off, -1); off += 2;
            WriteFixedString(bytes, off, 64, ""); off += 64;

            WriteI32(bytes, off, surfaceRecords.Count); off += 4;
            foreach (((int x, int y) key, int surface) in surfaceRecords)
            {
                WriteI16(bytes, off, (short)key.x);
                WriteI16(bytes, off + 2, (short)key.y);
                WriteI16(bytes, off + 4, (short)surface);
                off += 6;
            }

            if (v2) WriteI32(bytes, off, itemRecords.Count); else WriteI16(bytes, off, (short)itemRecords.Count);
            off += countSize;
            foreach (MapItemRecord item in itemRecords)
            {
                WriteItemRecord(bytes, off, item, v2);
                off += ItemRecordSize;
            }

            if (v2) WriteI32(bytes, off, monsterRecords.Count); else WriteI16(bytes, off, (short)monsterRecords.Count);
            off += countSize;
            foreach (MapMonsterRecord monster in monsterRecords)
            {
                WriteMonsterRecord(bytes, off, monster);
                off += MonsterRecordSize;
            }

            // The reference tool always declares a 5000-byte notes length regardless of the
            // actual text length (the reader tolerates this by trimming trailing NULs/whitespace)
            // - replicated as-is for byte-compatibility with real files, not "fixed".
            WriteI16(bytes, off, 5000); off += 2;
            WriteFixedString(bytes, off, 5000, map.notes ?? "");

            return bytes;
        }

        private static void WriteItemRecord(byte[] bytes, int off, MapItemRecord item, bool v2)
        {
            if (item.rawRecord is { Length: ItemRecordSize })
            {
                Array.Copy(item.rawRecord, 0, bytes, off, ItemRecordSize);

                if (!item.dirty)
                    return;
            }
            else
            {
                Array.Clear(bytes, off, ItemRecordSize);
                WriteI16(bytes, off, -1);

                if (v2)
                {
                    WriteI16(bytes, off + 2, 1);
                    WriteI16(bytes, off + 244, -1);
                }
            }

            WriteI16(bytes, off + 4, (short)item.itemId);
            WriteI16(bytes, off + 6, (short)item.x);
            WriteI16(bytes, off + 8, (short)item.y);
            WriteI16(bytes, off + 10, (short)item.data1);
            WriteI16(bytes, off + 12, (short)item.data2);
            WriteI16(bytes, off + 14, (short)item.data3);
            WriteI16(bytes, off + 16, (short)item.data4);
            WriteI16(bytes, off + 18, (short)item.data5);
            WriteI16(bytes, off + 34, (short)item.reset);
            WriteI16(bytes, off + 36, (short)(item.uses != 0 ? item.uses : item.data5));
            WriteI16(bytes, off + 38, (short)item.trigger);
            WriteF32(bytes, off + 40, item.timeout);
            WriteFixedString(bytes, off + 44, 200, item.text ?? "");
            WriteI16(bytes, off + 246, (short)item.putIn);
        }

        private static void WriteMonsterRecord(byte[] bytes, int off, MapMonsterRecord monster)
        {
            if (monster.rawRecord is { Length: MonsterRecordSize })
            {
                Array.Copy(monster.rawRecord, 0, bytes, off, MonsterRecordSize);

                if (!monster.dirty)
                    return;
            }
            else
            {
                Array.Clear(bytes, off, MonsterRecordSize);
                WriteI16(bytes, off, -1);
            }

            WriteI16(bytes, off + 2, (short)monster.monsterId);
            WriteI16(bytes, off + 4, (short)monster.x);
            WriteI16(bytes, off + 6, (short)monster.y);
            WriteI16(bytes, off + 8, (short)monster.timeout);
        }

        // Byte<->char passthrough (not UTF8) matching the source tool's String.fromCharCode /
        // charCodeAt & 0xff round trip - legacy fixed-width game text is effectively Latin-1/ASCII.
        internal static string ReadFixedString(byte[] bytes, int offset, int length)
        {
            int end = Math.Min(bytes.Length, offset + length);
            Span<char> chars = end > offset ? new char[end - offset] : Span<char>.Empty;

            for (int i = offset; i < end; i++)
            {
                byte value = bytes[i];
                chars[i - offset] = value == 0 ? ' ' : (char)value;
            }

            return new string(chars).TrimEnd();
        }

        internal static void WriteFixedString(byte[] bytes, int offset, int length, string text)
        {
            Array.Clear(bytes, offset, length);
            int count = Math.Min(length, text.Length);

            for (int i = 0; i < count; i++)
                bytes[offset + i] = (byte)(text[i] & 0xff);
        }

        private static int ReadI16(byte[] bytes, int offset) =>
            BinaryPrimitives.ReadInt16LittleEndian(bytes.AsSpan(offset, 2));

        private static uint ReadU32(byte[] bytes, int offset) =>
            BinaryPrimitives.ReadUInt32LittleEndian(bytes.AsSpan(offset, 4));

        private static int ReadI32(byte[] bytes, int offset) =>
            BinaryPrimitives.ReadInt32LittleEndian(bytes.AsSpan(offset, 4));

        private static float ReadF32(byte[] bytes, int offset) =>
            BinaryPrimitives.ReadSingleLittleEndian(bytes.AsSpan(offset, 4));

        private static void WriteI16(byte[] bytes, int offset, short value) =>
            BinaryPrimitives.WriteInt16LittleEndian(bytes.AsSpan(offset, 2), value);

        private static void WriteI32(byte[] bytes, int offset, int value) =>
            BinaryPrimitives.WriteInt32LittleEndian(bytes.AsSpan(offset, 4), value);

        private static void WriteF32(byte[] bytes, int offset, float value) =>
            BinaryPrimitives.WriteSingleLittleEndian(bytes.AsSpan(offset, 4), value);
    }
}
