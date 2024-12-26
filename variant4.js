import { transform } from "framer-motion";

export const fadeIn4 = (direction, delay) => {
    return {
        hidden: {
            y: direction === 'up' ? 50 : direction === 'down' ? -20 : 0,
            x: direction === 'right' ? 50 : direction === 'left' ? -20 : 0,
            opacity: 0,
            rotate: "180deg",
            scale: 0.1,
        },

        show: {
            y: 0,
            x: 0,
            opacity: 1,
            rotate: "0deg",
            scale: 1,
            transition: {
                duration: 0.5,
                ease: 'easeInOut',
                type: 'spring',
                stiffness: 100,
                damping: 25,
                delay: delay || 0,
            },
        },
    };
}