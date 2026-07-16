namespace MyTools
{
    // Identity for one INI entry (an item, a monster, a treasure group, ...). The editor UI reads
    // and writes actual field content directly through IniDoc/EditorEntry/BlockWriter - this only
    // needs to carry enough to find, list, and label an entry.
    public class Definition
    {
        public ServerFile fileType { get; set; }
        public int entryId { get; set; }
        public int ordinal { get; set; }
        public int ID { get; set; }
        public string name { get; set; } = "";
    }
}
