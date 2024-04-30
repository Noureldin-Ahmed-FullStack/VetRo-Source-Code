import React from 'react'

import { motion } from "framer-motion";
import '../../MyCss/ModalStyles.css';
import Backdrop from './Backdrop';
export default function Modal({ handleClose, animation, children }) {
    // const dropIn = {
    //     hidden: {
    //         y: "-100vh",
    //         opacity: 0,
    //     },
    //     visible: {
    //         y: "0",
    //         opacity: 1,
    //         transition: {
    //             duration: 0.1,
    //             type: "spring",
    //             damping: 25,
    //             stiffness: 500,
    //         },
    //     },
    //     exit: {
    //         y: "100vh",
    //         opacity: 0,
    //     },
    // };
    // const flip = {
    //     hidden: {
    //         transform: "scale(0) rotateX(-360deg)",
    //         opacity: 0,
    //         transition: {
    //             delay: 0.3,
    //         },
    //     },
    //     visible: {
    //         transform: " scale(1) rotateX(0deg)",
    //         opacity: 1,
    //         transition: {
    //             duration: 0.5,
    //         },
    //     },
    //     exit: {
    //         transform: "scale(0) rotateX(360deg)",
    //         opacity: 0,
    //         transition: {
    //             duration: 0.5,
    //         },
    //     },
    // };
    // const newspaper = {
    //     hidden: {
    //         transform: "scale(0) rotate(720deg)",
    //         opacity: 0,
    //         transition: {
    //             delay: 0.3,
    //         },
    //     },
    //     visible: {
    //         transform: " scale(1) rotate(0deg)",
    //         opacity: 1,
    //         transition: {
    //             duration: 0.5,
    //         },
    //     },
    //     exit: {
    //         transform: "scale(0) rotate(-720deg)",
    //         opacity: 0,
    //         transition: {
    //             duration: 0.3,
    //         },
    //     },
    // };
    // const badSuspension = {
    //     hidden: {
    //         y: "-100vh",
    //         opacity: 0,
    //         transform: "scale(0) rotateX(-360deg)",
    //     },
    //     visible: {
    //         y: "-25vh",
    //         opacity: 1,
    //         transition: {
    //             duration: 0.2,
    //             type: "spring",
    //             damping: 15,
    //             stiffness: 500,
    //         },
    //     },
    //     exit: {
    //         y: "-100vh",
    //         opacity: 0,
    //     },
    // };
    const animations = {
        dropIn: {
            hidden: {
                y: "-100vh",
                opacity: 0,
            },
            visible: {
                y: "0",
                opacity: 1,
                transition: {
                    duration: 0.1,
                    type: "spring",
                    damping: 25,
                    stiffness: 500,
                },
            },
            exit: {
                y: "100vh",
                opacity: 0,
            },
        },
        flip: {
            hidden: {
                transform: "scale(0) rotateX(-360deg)",
                opacity: 0,
                transition: {
                    delay: 0.3,
                },
            },
            visible: {
                transform: "scale(1) rotateX(0deg)",
                opacity: 1,
                transition: {
                    duration: 0.5,
                },
            },
            exit: {
                transform: "scale(0) rotateX(360deg)",
                opacity: 0,
                transition: {
                    duration: 0.5,
                },
            },
        },
        newspaper: {
            hidden: {
                transform: "scale(0) rotate(720deg)",
                opacity: 0,
                transition: {
                    delay: 0.3,
                },
            },
            visible: {
                transform: "scale(1) rotate(0deg)",
                opacity: 1,
                transition: {
                    duration: 0.5,
                },
            },
            exit: {
                transform: "scale(0) rotate(-720deg)",
                opacity: 0,
                transition: {
                    duration: 0.3,
                },
            },
        },
    };
    const selectedAnimation = animations[animation] || animations['dropIn'];
    return (
        <Backdrop onClick={handleClose}>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="MyModal blue-gradient"
                variants={selectedAnimation}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                {/* <button onClick={handleClose}>Close</button> */}
                <div className='w-100 d-flex justify-content-end mt-2'>
                    <div className='p-1 exitAnim d-flex align-items-center'>
                        <i onClick={handleClose} className="fa-solid fa-xmark biggerIcon"></i>
                    </div>

                </div>
                <div className='ModalBody w-100'>
                    {children}

                </div>
            </motion.div>
        </Backdrop>
    );
}
