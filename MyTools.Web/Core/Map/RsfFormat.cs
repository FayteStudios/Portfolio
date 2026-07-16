using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

namespace MyTools.Map
{
    // The .rsf text script format: line-oriented imperative commands (/SURFACEIXY, /ITEMIXY,
    // /ITEMSPAWNIXY, /ITEMTEXTIXY, /MONSTERSPAWNADDXY, /MAPITEMCLEAR), an alternative,
    // diffable/portable export next to the raw .map binary. Ported from the reference tool's
    // parseRsf/buildRsfText.
    public static class RsfFormat
    {
        public static MapDocument Parse(string text, string name)
        {
            MapDocument map = MapDocument.CreateEmpty(50, 50, name);

            int? clearWidth = null;
            int? clearHeight = null;
            bool clearIsSquare = false;
            int maxX = 1;
            int maxY = 1;
            Dictionary<(int x, int y), string> pendingText = new();

            foreach (string rawLine in text.Split('\n'))
            {
                string line = rawLine.TrimEnd('\r').Trim();

                if (line.Length == 0 || line.StartsWith(";", StringComparison.Ordinal))
                    continue;

                int space = line.IndexOf(' ');
                string command = (space == -1 ? line : line[..space]).ToUpperInvariant();
                string rest = space == -1 ? "" : line[(space + 1)..];
                List<int> nums = ParseNumberList(rest);

                if (command == "/MAPITEMCLEAR" && nums.Count >= 1)
                {
                    clearWidth = nums[0];
                    clearHeight = nums.Count >= 2 ? nums[1] : nums[0];
                    clearIsSquare = nums.Count < 2;
                    continue;
                }

                if (command == "/SURFACEIXY" && nums.Count >= 3)
                {
                    int surface = nums[0], x = nums[1], y = nums[2];
                    map.surfaces[(x, y)] = surface;
                    maxX = Math.Max(maxX, x);
                    maxY = Math.Max(maxY, y);
                    continue;
                }

                if (command == "/MONSTERSPAWNADDXY" && nums.Count >= 4)
                {
                    int x = nums[0], y = nums[1], monsterId = nums[2], timeout = nums[3];
                    map.monsters[(x, y)] = new MapMonsterRecord
                    {
                        dirty = true,
                        monsterId = monsterId,
                        x = x,
                        y = y,
                        timeout = timeout
                    };
                    maxX = Math.Max(maxX, x);
                    maxY = Math.Max(maxY, y);
                    continue;
                }

                if (command == "/ITEMIXY" && nums.Count >= 3)
                {
                    int itemId = nums[0], x = nums[1], y = nums[2];
                    int data1 = At(nums, 3), data2 = At(nums, 4), data3 = At(nums, 5),
                        data4 = At(nums, 6), data5 = At(nums, 7), reset = At(nums, 8), trigger = At(nums, 9);

                    map.items[(x, y)] = new MapItemRecord
                    {
                        dirty = true,
                        itemId = itemId,
                        x = x,
                        y = y,
                        data1 = data1,
                        data2 = data2,
                        data3 = data3,
                        data4 = data4,
                        data5 = data5,
                        reset = reset,
                        uses = data5,
                        trigger = trigger,
                        timeout = 0,
                        text = "",
                        putIn = 0
                    };
                    maxX = Math.Max(maxX, x);
                    maxY = Math.Max(maxY, y);
                    continue;
                }

                if (command == "/ITEMSPAWNIXY" && nums.Count >= 4)
                {
                    int itemId = nums[0], x = nums[1], y = nums[2], timeout = nums[3];
                    int data1 = At(nums, 4), data2 = At(nums, 5), data3 = At(nums, 6),
                        data4 = At(nums, 7), data5 = At(nums, 8), reset = At(nums, 9), trigger = At(nums, 10);

                    map.items[(x, y)] = new MapItemRecord
                    {
                        dirty = true,
                        itemId = itemId,
                        x = x,
                        y = y,
                        data1 = data1,
                        data2 = data2,
                        data3 = data3,
                        data4 = data4,
                        data5 = data5,
                        reset = reset,
                        uses = data5,
                        trigger = trigger,
                        timeout = timeout,
                        text = "",
                        putIn = 0
                    };
                    maxX = Math.Max(maxX, x);
                    maxY = Math.Max(maxY, y);
                    continue;
                }

                if (command == "/ITEMTEXTIXY" && nums.Count >= 2)
                {
                    int x = nums[0], y = nums[1];
                    int thirdComma = NthIndex(rest, ',', 2);
                    string value = thirdComma == -1 ? "" : rest[(thirdComma + 1)..].Trim();
                    pendingText[(x, y)] = value.Length > 200 ? value[..200] : value;
                    maxX = Math.Max(maxX, x);
                    maxY = Math.Max(maxY, y);
                }
            }

            if (clearIsSquare)
            {
                int size = Math.Max(clearWidth ?? 0, Math.Max(maxX, maxY));
                map.width = size;
                map.height = size;
            }
            else
            {
                map.width = Math.Max(clearWidth ?? 0, maxX);
                map.height = Math.Max(clearHeight ?? 0, maxY);
            }

            foreach (KeyValuePair<(int x, int y), string> entry in pendingText)
            {
                if (map.items.TryGetValue(entry.Key, out MapItemRecord? item))
                    item.text = entry.Value;
            }

            return map;
        }

        public static string Build(MapDocument map)
        {
            string clearLine = map.width == map.height
                ? $"/MAPITEMCLEAR {map.width}"
                : $"/MAPITEMCLEAR {map.width}, {map.height}";

            List<string> lines = new() { clearLine };

            for (int y = 1; y <= map.height; y++)
            {
                for (int x = 1; x <= map.width; x++)
                {
                    (int x, int y) key = (x, y);

                    if (map.surfaces.TryGetValue(key, out int surface) && surface != 0)
                        lines.Add($"/SURFACEIXY {surface}, {x}, {y}");

                    if (map.monsters.TryGetValue(key, out MapMonsterRecord? monster))
                        lines.Add($"/MONSTERSPAWNADDXY {x}, {y}, {monster.monsterId}, {monster.timeout}");

                    if (map.items.TryGetValue(key, out MapItemRecord? item))
                    {
                        if (item.timeout > 0)
                        {
                            lines.Add($"/ITEMSPAWNIXY {item.itemId}, {x}, {y}, {(int)item.timeout}, " +
                                $"{item.data1}, {item.data2}, {item.data3}, {item.data4}, {item.data5}, {item.reset}, {item.trigger}");
                        }
                        else
                        {
                            lines.Add($"/ITEMIXY {item.itemId}, {x}, {y}, " +
                                $"{item.data1}, {item.data2}, {item.data3}, {item.data4}, {item.data5}, {item.reset}, {item.trigger}");
                        }

                        if (!string.IsNullOrEmpty(item.text))
                            lines.Add($"/ITEMTEXTIXY {x}, {y}, {item.text}");
                    }
                }
            }

            return string.Join("\r\n", lines);
        }

        private static int At(List<int> values, int index) => index < values.Count ? values[index] : 0;

        private static List<int> ParseNumberList(string text) =>
            text.Split(',')
                .Select(part => part.Trim())
                .Select(part => int.TryParse(part, NumberStyles.Integer, CultureInfo.InvariantCulture, out int value) ? (int?)value : null)
                .Where(value => value.HasValue)
                .Select(value => value!.Value)
                .ToList();

        private static int NthIndex(string text, char needle, int n)
        {
            int index = -1;

            for (int i = 0; i < n; i++)
            {
                index = text.IndexOf(needle, index + 1);

                if (index == -1)
                    return -1;
            }

            return index;
        }
    }
}
