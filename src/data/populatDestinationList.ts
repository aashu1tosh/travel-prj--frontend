import { image } from '@constant/image';

// Define the type for your list item
type ListItem = {
    imageSrc: string;
    text: string;
};

// Create an array of list items
export const popularDestination: ListItem[] = [
    { imageSrc: image?.kathmanduValley, text: 'Kathmandu Valley' },
    { imageSrc: image?.pokhara, text: 'Pokhara Valley' },
    { imageSrc: image?.illam, text: 'Illam' },
    { imageSrc: image?.rara, text: 'Rara Lake' },
    { imageSrc: image?.bandipur, text: 'Bandipur' },
    { imageSrc: image?.ghorePani, text: 'Ghorepani Poon Hill' },
];
