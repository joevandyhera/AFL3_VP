export type CreateRestaurantRequest = {
    name: string;
    description: string;
}

export type UpdateRestaurantStatusRequest = {
    isOpen: boolean;
}

export type UpdateRestaurantDescriptionRequest = {
    description: string;
}