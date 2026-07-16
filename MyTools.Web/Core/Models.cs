using System;
using System.Collections.Generic;
using System.Linq;

namespace MyTools
{
    public enum ServerFile
    {
        Items, Monsters, Skills, Usages, MultiUses, Magic, Treasure, World, Animations
    }

    public enum ServerFileBlockMode
    {
        KeyBlock,
        NamedKeyBlock,
        FlagBlock,
        WholeFile
    }

    public class SaveValidation
    {
        public bool success { get; set; }
        public string path { get; set; } = "";
        public string backupPath { get; set; } = "";
        public string error { get; set; } = "";
    }

    public readonly record struct ServerFileInfo(ServerFile file, string displayName, string fileName, string blockMarker,
    ServerFileBlockMode blockMode);

    public class ServerFileStatus
    {
        public ServerFile file { get; set; }
        public string displayName { get; set; } = "";
        public string fileName { get; set; } = "";
        public string path { get; set; } = "";
        public bool exists { get; set; }
        public bool loaded { get; set; }
        public int entryCount { get; set; }
        public int keyCount { get; set; }
        public int flagCount { get; set; }
        public int rawCount { get; set; }
        public string error { get; set; } = "";
    }

    public class ServerWorkspace
    {
        public string folderPath { get; set; } = "";
        public List<ServerFileStatus> files { get; set; } = new();

        public IniDoc? itemDoc { get; set; }
        public IniDoc? monsterDoc { get; set; }
        public IniDoc? skillDoc { get; set; }
        public IniDoc? usageDoc { get; set; }
        public IniDoc? multiUseDoc { get; set; }
        public IniDoc? magicDoc { get; set; }
        public IniDoc? treasureDoc { get; set; }
        public IniDoc? worldDoc { get; set; }
        public IniDoc? animationDoc { get; set; }

        public List<Definition> items { get; set; } = new();
        public List<Definition> monsters { get; set; } = new();
        public List<Definition> skills { get; set; } = new();
        public List<Definition> usages { get; set; } = new();
        public List<Definition> multiUses { get; set; } = new();
        public List<Definition> magic { get; set; } = new();
        public List<Definition> treasures { get; set; } = new();
        public List<Definition> world { get; set; } = new();
        public List<Definition> animations { get; set; } = new();

        public IniDoc? GetDoc(ServerFile file) => file switch
        {
            ServerFile.Items => itemDoc,
            ServerFile.Monsters => monsterDoc,
            ServerFile.Skills => skillDoc,
            ServerFile.Usages => usageDoc,
            ServerFile.MultiUses => multiUseDoc,
            ServerFile.Magic => magicDoc,
            ServerFile.Treasure => treasureDoc,
            ServerFile.World => worldDoc,
            ServerFile.Animations => animationDoc,
            _ => null
        };

        public List<Definition> GetDefinitions(ServerFile file) => file switch
        {
            ServerFile.Items => items,
            ServerFile.Monsters => monsters,
            ServerFile.Skills => skills,
            ServerFile.Usages => usages,
            ServerFile.MultiUses => multiUses,
            ServerFile.Magic => magic,
            ServerFile.Treasure => treasures,
            ServerFile.World => world,
            ServerFile.Animations => animations,
            _ => new List<Definition>()
        };
    }

    #region Tools
    public enum ToolPage
    {
        dashboard,
        world,
        skills,
        animations,
        treasures,
        magic,
        monsters,
        items,
        itemUses,
        multiUses,
        spriteSheets,
        mapEditor,
        masterMaker,
        serverControl
    }

    public class ToolNavigationRow
    {
        public ToolPage page { get; set; }

        public string title { get; set; } = "";

        public string description { get; set; } = "";

        public string icon { get; set; } = "";
    }
    
    public class LogRow
    {
        public DateTime time { get; set; } = DateTime.Now;

        public string level { get; set; } = "Info";

        public string message { get; set; } = "";

        public string displayText => $"[{time:HH:mm:ss}] {level}: {message}";
    }

    public class EditorEntry
    {
        public string group { get; set; } = "";

        public string type { get; set; } = "Field";

        public string kind { get; set; } = "text";
        public string defaultValue { get; set; } = "";

        public string key { get; set; } = "";

        public string label { get; set; } = "";

        public string value { get; set; } = "";

        public bool required { get; set; }

        public bool allowEmpty { get; set; } = true;

        public List<string> options { get; set; } = new();

        public string picker { get; set; } = "";

        public string description { get; set; } = "";

        public bool allowMultiple { get; set; }

        public bool appendPickedValue { get; set; }

        public string valueSeparator { get; set; } = ",";

        public bool isFlag =>
            kind.Equals("flag", StringComparison.OrdinalIgnoreCase) ||
            type.Equals("Flag", StringComparison.OrdinalIgnoreCase);
        public bool hasPicker =>
            kind.Equals("sprite", StringComparison.OrdinalIgnoreCase) ||
            kind.Equals("soundPicker", StringComparison.OrdinalIgnoreCase) ||
            kind.Equals("monsterPicker", StringComparison.OrdinalIgnoreCase) ||
            kind.Equals("itemPicker", StringComparison.OrdinalIgnoreCase) ||
            kind.Equals("skillPicker", StringComparison.OrdinalIgnoreCase) ||
            kind.Equals("magicPicker", StringComparison.OrdinalIgnoreCase) ||
            kind.Equals("animationPicker", StringComparison.OrdinalIgnoreCase) ||
            !string.IsNullOrWhiteSpace(picker);
    }


    #endregion




    #region INI

    public class IniDoc
    {
        public string? source { get; set; }
        public string newLine { get; set; } = Environment.NewLine;
        public List<IniLine> lines { get; } = new();
        public IEnumerable<Key> keyLines => lines.OfType<Key>();
        public IEnumerable<Comment> comments => lines.OfType<Comment>();
        public IEnumerable<BlankLine> blanks => lines.OfType<BlankLine>();
        public IEnumerable<SectionLine> sections => lines.OfType<SectionLine>();
        public IEnumerable<RawLine> raws => lines.OfType<RawLine>();
        public IEnumerable<Flag> flags => lines.OfType<Flag>();

        public int lineCount => lines.Count;
        public int keyCount => keyLines.Count();
        public int commentCount => comments.Count();
        public int blankCount => blanks.Count();
        public int sectionCount => sections.Count();
        public int rawCount => raws.Count();
        public int flagCount => flags.Count(); 
        public IReadOnlyCollection<string> uniqueKeys =>
            keyLines.Select(line => line.key)
            .Where(key => !string.IsNullOrWhiteSpace(key))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .OrderBy(key => key, StringComparer.OrdinalIgnoreCase)
            .ToList();
        public IEnumerable<Key> GetValues(string key) =>
            keyLines.Where(line => string.Equals(line.key, key, StringComparison.OrdinalIgnoreCase));
        public IEnumerable<Flag> flagLines => lines.OfType<Flag>();
        public Key? GetFirst(string key) => GetValues(key).FirstOrDefault();

    }
    
    public class IniLine
    {
        public int lineNumber { get; set; }
        public string originalText { get; set; } = "";
    }
    
    public class Flag : IniLine
    {
        public string name { get; set; } = "";
    }
    
    public class BlankLine : IniLine
    {
        public string text { get; set; } = "";
        public char marker { get; set; }
    }
    
    public class Comment : IniLine
    {
        public string name { get; set; } = "";
        public string text { get; set; } = "";
        public char marker { get; set; }
    }
    
    public class Key : IniLine
    {
        public string key { get; set; } = "";
        public string value { get; set; } = "";
        public string separator { get; set; } = "=";
        public bool isModded { get; set; }
        public bool flag { get; set; }
    }
    
    public class RawLine : IniLine
    {
        public string reason { get; set; } = "";
    }

    public class SectionLine : IniLine
    {
        public string name { get; init; } = "";
    }
    #endregion


    #region Item
    public class ListEntry
    {
        public int id { get; set; }
        public string name { get; set; } = "";
        public string value { get; set; } = "";
    }

    #endregion






    #region Sprites
    public class SpriteEntry
    {
        public int ID { get; set; }

        public string sheetName { get; set; } = "";

        public string sheetPath { get; set; } = "";

        public int sheetIndex { get; set; }

        public int column { get; set; }

        public int row { get; set; }

        public int X { get; set; }

        public int Y { get; set; }

        public int width { get; set; } = 32;

        public int height { get; set; } = 32;

        public string DisplayName
        {
            get
            {
                if (string.IsNullOrWhiteSpace(sheetName))
                    return ID.ToString();

                return $"{ID} - {sheetName}";
            }
        }

        public string LocationText
        {
            get
            {
                return $"Sheet {sheetIndex}, Col {column}, Row {row}";
            }
        }

        public string SizeText
        {
            get
            {
                return $"{width}x{height}";
            }
        }

        public override string ToString()
        {
            return DisplayName;
        }
    }

    #endregion

}