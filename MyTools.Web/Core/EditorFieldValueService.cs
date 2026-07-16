using System;
using System.Collections.Generic;
using System.Linq;

namespace MyTools
{
    public static class EditorFieldValueService
    {
        public static void ApplyPickedValue(EditorEntry entry, string pickedValue)
        {
            if (string.IsNullOrWhiteSpace(pickedValue))
                return;

            if (entry.appendPickedValue || entry.allowMultiple)
            {
                AppendValue(entry, pickedValue);
                return;
            }

            entry.value = pickedValue;
        }


        private static void AppendValue(EditorEntry entry, string pickedValue)
        {
            string separator = string.IsNullOrEmpty(entry.valueSeparator)
                ? ","
                : entry.valueSeparator;

            if (string.IsNullOrWhiteSpace(entry.value))
            {
                entry.value = pickedValue;
                return;
            }

            List<string> values = entry.value
                .Split(
                    separator,
                    StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                .ToList();

            if (!values.Contains(pickedValue, StringComparer.OrdinalIgnoreCase))
            {
                values.Add(pickedValue);
            }

            entry.value = string.Join(separator + " ", values);
        }

        public static bool IsEnabled(string? value)
        {
            if (string.IsNullOrWhiteSpace(value))
                return true;

            return value.Equals("true", StringComparison.OrdinalIgnoreCase) ||
                value.Equals("1", StringComparison.OrdinalIgnoreCase) ||
                value.Equals("yes", StringComparison.OrdinalIgnoreCase) ||
                value.Equals("on", StringComparison.OrdinalIgnoreCase);
        }
    }

    public class PickerColumn<T>
    {
        public string header { get; set; } = "";

        public string bindingPath { get; set; } = "";

        public double width { get; set; } = 160;
    }

    public class PickerRequest<T>
    {
        public string title { get; set; } = "Pick Value";

        public IReadOnlyList<T> items { get; set; } = new List<T>();

        public List<PickerColumn<T>> columns { get; set; } = new();

        public Func<T, string, bool>? matchesSearch { get; set; }

        public Func<T, string> getValue { get; set; } = item => item?.ToString() ?? "";

        public string emptyMessage { get; set; } = "No options found.";
    }
}
