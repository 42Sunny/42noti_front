import { marked } from 'marked';
import styled from 'styled-components';

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
    <StyledMarkdown
      dangerouslySetInnerHTML={{
        __html: marked.parse(html),
      }}
    />
  );
};

export default Markdown;

const StyledMarkdown = styled.div`
  p {
    margin-bottom: 10px;
  }
  a {
    color: ${({ theme }) => theme.colors.blue};
    word-break: break-all;
  }
  strong {
    font-weight: 600;
  }
  ul {
    list-style: inside;
    margin: 10px;
  }
`;
