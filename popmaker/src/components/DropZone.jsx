import { useDrop } from 'react-dnd';
import { X, Type, Image, Mail, Square } from 'lucide-react';

const DropZone = ({ elements, onAddElement, onRemoveElement, onUpdateElement }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ELEMENT',
    drop: (item) => {
      const newElement = {
        id: Date.now(),
        type: item.type,
        label: item.label,
        content: getDefaultContent(item.type),
      };
      onAddElement(newElement);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const getDefaultContent = (type) => {
    switch (type) {
      case 'heading':
        return { text: 'Your Heading Here', fontSize: 24, color: '#333333' };
      case 'text':
        return { text: 'Your text content here', fontSize: 16, color: '#666666' };
      case 'image':
        return { src: '', alt: 'Image', width: 200 };
      case 'email':
        return { placeholder: 'Enter your email', required: true };
      case 'button':
        return { text: 'Click Me', backgroundColor: '#4F46E5', textColor: '#ffffff' };
      default:
        return {};
    }
  };

  const renderElement = (element) => {
    const iconMap = {
      heading: Type,
      text: Type,
      image: Image,
      email: Mail,
      button: Square,
    };
    const Icon = iconMap[element.type];

    return (
      <div
        key={element.id}
        className="relative p-4 bg-white border border-gray-200 rounded-lg mb-3 group hover:border-blue-400"
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon size={20} className="text-gray-500" />}
          <div className="flex-1">
            {element.type === 'heading' && (
              <input
                type="text"
                value={element.content.text}
                onChange={(e) =>
                  onUpdateElement(element.id, {
                    ...element,
                    content: { ...element.content, text: e.target.value },
                  })
                }
                className="w-full font-bold text-lg border-none focus:ring-2 focus:ring-blue-500 rounded"
                style={{ fontSize: element.content.fontSize }}
              />
            )}
            {element.type === 'text' && (
              <textarea
                value={element.content.text}
                onChange={(e) =>
                  onUpdateElement(element.id, {
                    ...element,
                    content: { ...element.content, text: e.target.value },
                  })
                }
                className="w-full border-none focus:ring-2 focus:ring-blue-500 rounded resize-none"
                rows={2}
                style={{ fontSize: element.content.fontSize }}
              />
            )}
            {element.type === 'email' && (
              <input
                type="email"
                placeholder={element.content.placeholder}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                disabled
              />
            )}
            {element.type === 'button' && (
              <button
                className="px-4 py-2 rounded font-medium"
                style={{
                  backgroundColor: element.content.backgroundColor,
                  color: element.content.textColor,
                }}
              >
                {element.content.text}
              </button>
            )}
            {element.type === 'image' && (
              <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-gray-400">Image Placeholder</span>
              </div>
            )}
          </div>
          <button
            onClick={() => onRemoveElement(element.id)}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-opacity"
          >
            <X size={16} className="text-red-500" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={drop}
      className={`min-h-[400px] p-4 bg-gray-50 rounded-lg border-2 ${
        isOver ? 'border-blue-400 bg-blue-50' : 'border-dashed border-gray-300'
      }`}
    >
      <h3 className="text-sm font-semibold text-gray-600 mb-4">Popup Canvas</h3>
      {elements.length === 0 ? (
        <p className="text-gray-400 text-center py-8">
          Drag elements here to build your popup
        </p>
      ) : (
        elements.map(renderElement)
      )}
    </div>
  );
};

export default DropZone;
