const MARKDOWN_RULES = [
  { title: "Form h1 to h6", rule: "# Heading -> ######" },
  { title: "Blockquote", rule: "> Your Quote" },
  { title: "Image", rule: "![image alt](http://image_url.com)" },
  { title: "Link", rule: "[Link Text](http://your_link.com)" },
];

const MarkdownRule = () => {
  return (
    <div className="px-2 py-4 bg-white mt-11 rounded">
      <h1 className="font-semibold text-center border-b">
        General markdown rules
      </h1>
      <ul className="space-y-2">
        {MARKDOWN_RULES.map(({ title, rule }) => (
          <li key={rule}>
            <p className="font-semibold text-gray-500">{title}</p>
            <p className="font-semibold text-gray-700 font-mono">{rule}</p>
          </li>
        ))}
        <li className="text-center text-blue-500 hover:underline">
          <a
            href="https://www.markdownguide.org/basic-syntax/"
            target="_blank"
            rel="noreferrer"
          >
            Find out more
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MarkdownRule;
