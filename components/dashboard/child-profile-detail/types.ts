export type ChildDetail = {
  id: string;
  name: string;
  age: string;
  focus: string;
  image: string;
  imagePosition: string;
};

export const childDetails: Record<string, ChildDetail> = {
  emma: {
    id: 'emma',
    name: 'Emma Lin',
    age: 'Age: 4 yr',
    focus: 'Current focus: Build fine motor strength through daily hand activities',
    image: '/Home/figma-child-detail-emma.png',
    imagePosition: '50% 25%',
  },
  leo: {
    id: 'leo',
    name: 'Leo Lin',
    age: 'Age: 3 yr',
    focus: 'Current focus: Practice standing balance and supported walking',
    image: '/Home/figma-child-profile-leo.png',
    imagePosition: '50% 22%',
  },
};
