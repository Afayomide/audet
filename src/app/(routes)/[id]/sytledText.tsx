import React from 'react';
import "./blog.css"

interface MusicBlogProps {
  description: string[];
  highlights: string[];
}

const StyledTexts: React.FC<MusicBlogProps> = ({ description, highlights }) => {
  // Function to style the highlighted words
  const styleHighlights = (text: string, highlights: string[]) => {
    let styledText = text;

    if(highlights){
         highlights.forEach((highlight) => {
      // Using Regex to find the highlight in the text and wrap it in a span with a style class
      const regex = new RegExp(`(${highlight})`, 'gi');
      styledText = styledText.replace(regex, `<span class="highlight">$1</span>`);
    });
    }

   

    return styledText;
  };

  return (
    <div>
      {description.map((paragraph, index) => (
        <p className='description' key={index} dangerouslySetInnerHTML={{ __html: styleHighlights(paragraph, highlights) }} />
      ))}
    </div>
  );
};

export default StyledTexts;
