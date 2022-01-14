import { marked } from 'marked';

type Props = {
  children: string;
};

const Markdown = ({ children }: Props) => {
  const renderer = new marked.Renderer();
  renderer.link = (href, title, text) => {
    return (
      '<a target="_blank" rel="noopener noreferrer" href="' +
      href +
      '" title="' +
      title +
      '">' +
      text +
      '</a>'
    );
  };
  const html = marked(children, { renderer });
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: marked.parse(html),
      }}
    />
  );
};

export default Markdown;
