import { TEMPLATES } from '../data/templates';

const TemplateLibrary = ({ onSelectTemplate }) => {
  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-gray-600 mb-4">Templates</h3>
      <div className="space-y-3">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template)}
            className="w-full p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all text-left"
          >
            <div className="flex items-start gap-3">
              <div
                className="w-12 h-12 rounded flex-shrink-0"
                style={{ backgroundColor: template.content.backgroundColor }}
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-800 text-sm truncate">
                  {template.name}
                </h4>
                <p className="text-xs text-gray-500 mt-1 truncate">
                  {template.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateLibrary;
