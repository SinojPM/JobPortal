import { notifications } from "@mantine/notifications";
export const errorNotification = (title: string, message: string):void => {
    notifications.show({
        title,
        message,
        color: 'red',
        styles: () => ({
            root: { backgroundColor: '#eff6ff', border: '1px solid red' },
            title: { color: 'black' },
            description: { color: 'rgb(212, 130, 119)' },
        }),
    });
}

export const successNotifications = (title: string, message: string):void => {
    notifications.show({
        title,
        message,
        color: 'rgb(90, 196, 88)',
        styles: () => ({
            root: { backgroundColor: '#eff6ff', border: '1px solid rgb(90, 196, 88)' },
            title: { color: 'black' },
            description: { color: 'rgb(90, 196, 88)' },
        }),
    });
}

export const warningNotifications = (title: string, message: string):void => {
    notifications.show({
        title,
        message,
        color: 'rgb(242, 128, 58)',
        styles: () => ({
            root: { backgroundColor: '#eff6ff', border: '1px solid rgb(177, 112, 33)' },
            title: { color: 'black' },
            description: { color: 'rgb(246, 135, 44)' },
        }),
    });
}