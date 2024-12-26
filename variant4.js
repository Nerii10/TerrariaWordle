import { transform } from "framer-motion";

export const fadeIn4 = (direction, delay) => {
    return {
        hidden: {
            y: direction === 'up' ? 50 : direction === 'down' ? -35 : 0,
            x: direction === 'right' ? 50 : direction === 'left' ? -20 : 0,
            opacity: 0,
            scale: 0.1,
        },

        show: {
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                ease: 'easeInOut',
                type: 'spring',
                delay: delay || 0,
            },
        },
    };
}