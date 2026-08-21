import { TRIGGER_TYPES, DISPLAY_RULES } from '../data/templates';

const TriggerSettings = ({ triggerConfig, onUpdateTrigger }) => {
  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-gray-600 mb-4">Trigger Settings</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Trigger Type
          </label>
          <select
            value={triggerConfig.type}
            onChange={(e) => onUpdateTrigger({ ...triggerConfig, type: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
          >
            {TRIGGER_TYPES.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {TRIGGER_TYPES.find((t) => t.id === triggerConfig.type)?.description}
          </p>
        </div>

        {triggerConfig.type === 'time' && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Delay (seconds)
            </label>
            <input
              type="number"
              min="0"
              value={triggerConfig.delay || 5}
              onChange={(e) =>
                onUpdateTrigger({ ...triggerConfig, delay: parseInt(e.target.value) })
              }
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        )}

        {triggerConfig.type === 'scroll' && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Scroll Percentage (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={triggerConfig.scrollPercentage || 50}
              onChange={(e) =>
                onUpdateTrigger({
                  ...triggerConfig,
                  scrollPercentage: parseInt(e.target.value),
                })
              }
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        )}

        {triggerConfig.type === 'click' && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              CSS Selector
            </label>
            <input
              type="text"
              placeholder=".my-button or #my-element"
              value={triggerConfig.selector || ''}
              onChange={(e) =>
                onUpdateTrigger({ ...triggerConfig, selector: e.target.value })
              }
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TriggerSettings;
