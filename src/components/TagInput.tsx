import React, { useState } from "react";

export default function TagInput() {
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const addTagsFromInput = (value: string) => {
    const delimiters = /[,\|\/\\+]+/g;
    const splitTags = value
      .split(delimiters)
      .map((t) => t.trim())
      .filter((t) => t.length > 0 && !tags.includes(t));

    if (splitTags.length > 0) {
      setTags([...tags, ...splitTags]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTagsFromInput(input);
      setInput("");
    }
  };

  const handleBlur = () => {
    addTagsFromInput(input);
    setInput("");
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full max-w-lg">
      <label className="block text-lg font-medium mb-2 mt-26">Tag Input</label>

      <div className="flex flex-wrap items-center border rounded p-2 min-h-[60px] w-full gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center bg-gray-200 px-2 py-1  text-sm max-w-full break-words"
          >
            {tag}
            <button
              onClick={() => removeTag(index)}
              className="ml-1 text-gray-500 hover:text-red-500"
            >
              ×
            </button>
          </span>
        ))}

        <input
          className="flex-1 min-w-[80px] border-none outline-none text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder={tags.length === 0 ? "พิมพ์ tag แล้วกด Enter" : ""}
        />
      </div>
      <p className="mt-2">หมายเหตุ: สามารถใช้ตัวคั่นได้ดังนี้ , \ / + | </p>
    </div>
  );
}
