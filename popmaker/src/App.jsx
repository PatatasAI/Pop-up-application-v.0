import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Type, Image, Mail, Button as ButtonIcon, Copy, Check } from 'lucide-react';
import DraggableElement from './components/DraggableElement';
import DropZone from './components/DropZone';
import TemplateLibrary from './components/TemplateLibrary';
import TriggerSettings from './components/TriggerSettings';
import CodeGenerator from './components/CodeGenerator';

function App() {
  const [elements, setElements] = useState([]);
  const [activeTab, setActiveTab] = useState('editor');
  const [copied, setCopied] = useState(false);
  
  const [popupContent, setPopupContent] = useState({
    backgroundColor: '#ffffff',
    textColor: '#333333',
  });
  
  const [triggerConfig, setTriggerConfig] = useState({
    type: 'time',
    delay: 5,
  });

  const handleAddElement = (element) => {
    setElements([...elements, element]);
  };

  const handleRemoveElement = (id) => {
    setElements(elements.filter((el) => el.id !== id));
  };

  const handleUpdateElement = (id, updatedElement) => {
    setElements(
      elements.map((el) => (el.id === id ? updatedElement : el))
    );
  };

  const handleSelectTemplate = (template) => {
    setPopupContent({
      backgroundColor: template.content.backgroundColor,
      textColor: template.content.textColor,
    });
    // Could add default elements based on template
  };

  const handleCopyCode = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const popupConfig = {
    elements,
    content: popupContent,
    triggerConfig,
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">PopMaker</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('editor')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'editor'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Editor
              </button>
              <button
                onClick={() => setActiveTab('export')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'export'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Export
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex h-[calc(100vh-80px)]">
          {/* Left Sidebar - Templates & Elements */}
          <aside className="w-72 bg-white border-r border-gray-200 overflow-y-auto">
            <TemplateLibrary onSelectTemplate={handleSelectTemplate} />
            
            <div className="p-4 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-600 mb-4">
                Elements
              </h3>
              <div className="space-y-2">
                <DraggableElement
                  type="heading"
                  label="Heading"
                  icon={Type}
                />
                <DraggableElement
                  type="text"
                  label="Text"
                  icon={Type}
                />
                <DraggableElement
                  type="image"
                  label="Image"
                  icon={Image}
                />
                <DraggableElement
                  type="email"
                  label="Email Input"
                  icon={Mail}
                />
                <DraggableElement
                  type="button"
                  label="Button"
                  icon={ButtonIcon}
                />
              </div>
            </div>
          </aside>

          {/* Center - Canvas */}
          {activeTab === 'editor' && (
            <section className="flex-1 p-8 overflow-y-auto">
              <div className="max-w-2xl mx-auto">
                <div
                  className="rounded-lg shadow-lg overflow-hidden"
                  style={{ backgroundColor: popupContent.backgroundColor }}
                >
                  <DropZone
                    elements={elements}
                    onAddElement={handleAddElement}
                    onRemoveElement={handleRemoveElement}
                    onUpdateElement={handleUpdateElement}
                  />
                </div>
                
                {/* Style Controls */}
                <div className="mt-6 p-4 bg-white rounded-lg shadow">
                  <h3 className="text-sm font-semibold text-gray-600 mb-4">
                    Style Settings
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Background Color
                      </label>
                      <input
                        type="color"
                        value={popupContent.backgroundColor}
                        onChange={(e) =>
                          setPopupContent({
                            ...popupContent,
                            backgroundColor: e.target.value,
                          })
                        }
                        className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-2">
                        Text Color
                      </label>
                      <input
                        type="color"
                        value={popupContent.textColor}
                        onChange={(e) =>
                          setPopupContent({
                            ...popupContent,
                            textColor: e.target.value,
                          })
                        }
                        className="w-full h-10 border border-gray-300 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Right Sidebar - Settings */}
          {activeTab === 'editor' && (
            <aside className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
              <TriggerSettings
                triggerConfig={triggerConfig}
                onUpdateTrigger={setTriggerConfig}
              />
            </aside>
          )}

          {/* Export Tab */}
          {activeTab === 'export' && (
            <section className="flex-1 p-8 overflow-y-auto bg-white">
              <div className="max-w-3xl mx-auto">
                <CodeGenerator
                  popupConfig={popupConfig}
                  onCopyCode={handleCopyCode}
                />
                {copied && (
                  <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg">
                    <Check size={18} />
                    <span>Copied to clipboard!</span>
                  </div>
                )}
              </div>
            </section>
          )}
        </main>
      </div>
    </DndProvider>
  );
}

export default App;
