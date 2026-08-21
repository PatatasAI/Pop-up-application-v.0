import { useDrag } from 'react-dnd';

const DraggableElement = ({ type, label, icon: Icon }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ELEMENT',
    item: { type, label },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg cursor-move hover:shadow-md transition-shadow ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {Icon && <Icon size={20} className="text-gray-600" />}
      <span className="text-sm font-medium text-gray-700">{label}</span>
    </div>
  );
};

export default DraggableElement;
