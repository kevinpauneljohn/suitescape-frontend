const data = [
  {
    title: 'Find a place to travel book a timeslot.',
    img: require('../assets/images/onboarding/page1.png'),
  },
  {
    title: 'With this app, you can book anytime Anywhere.',
    img: require('../assets/images/onboarding/page2.png'),
  },
  {
    title: 'Let’s Get Started',
    img: require('../assets/images/onboarding/page3.png'),
  },
].map((item, index) => ({...item, key: index}));

export default data;
