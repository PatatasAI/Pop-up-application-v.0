export const TEMPLATES = [
  {
    id: 'newsletter',
    name: 'Newsletter Signup',
    description: 'Simple newsletter subscription popup',
    content: {
      title: 'Subscribe to Our Newsletter',
      subtitle: 'Get the latest updates and offers',
      buttonText: 'Subscribe',
      backgroundColor: '#ffffff',
      textColor: '#333333',
      buttonColor: '#4F46E5',
      buttonTextColor: '#ffffff',
    },
  },
  {
    id: 'discount',
    name: 'Discount Offer',
    description: 'Promotional discount popup',
    content: {
      title: 'Get 20% Off!',
      subtitle: 'Use code SAVE20 at checkout',
      buttonText: 'Claim Offer',
      backgroundColor: '#FEF3C7',
      textColor: '#92400E',
      buttonColor: '#DC2626',
      buttonTextColor: '#ffffff',
    },
  },
  {
    id: 'announcement',
    name: 'Announcement',
    description: 'General announcement popup',
    content: {
      title: 'Important Announcement',
      subtitle: 'Check out our latest features',
      buttonText: 'Learn More',
      backgroundColor: '#DBEAFE',
      textColor: '#1E40AF',
      buttonColor: '#3B82F6',
      buttonTextColor: '#ffffff',
    },
  },
  {
    id: 'exit-intent',
    name: 'Exit Intent',
    description: 'Popup for when users are about to leave',
    content: {
      title: 'Wait! Don\'t Go Yet',
      subtitle: 'Sign up now and get exclusive benefits',
      buttonText: 'Sign Up',
      backgroundColor: '#F3E8FF',
      textColor: '#6B21A8',
      buttonColor: '#9333EA',
      buttonTextColor: '#ffffff',
    },
  },
];

export const TRIGGER_TYPES = [
  { id: 'time', name: 'Time Delay', description: 'Show after X seconds' },
  { id: 'scroll', name: 'Scroll Percentage', description: 'Show when user scrolls X%' },
  { id: 'exit', name: 'Exit Intent', description: 'Show when user tries to leave' },
  { id: 'click', name: 'Click Trigger', description: 'Show when user clicks element' },
];

export const DISPLAY_RULES = [
  { id: 'all', name: 'All Pages' },
  { id: 'specific', name: 'Specific Pages' },
  { id: 'homepage', name: 'Homepage Only' },
  { id: 'internal', name: 'Internal Pages Only' },
];
