import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

interface NotificationProps {
    msg: string;
    type: 'error' | 'success' | 'info';
}

export const Notification: React.FC<NotificationProps> = ({ msg, type }) => {
    const fontColor = useColorModeValue('gray.200', 'black');
    const infoColor = useColorModeValue('cyan.700', 'cyan.300');
    const successColor = useColorModeValue('green.700', 'green.300');
    const errorColor = useColorModeValue('red.700', 'red.300');
    return (
        <>
            {type === 'info' && (
                <Box
                    w='full'
                    alignItems='center'
                    textAlign='center'
                    backgroundColor={infoColor}
                    color={fontColor}>
                    <Text fontSize={['lg', '2xl']} fontWeight='500'>
                        {msg}
                    </Text>
                </Box>
            )}

            {type === 'success' && (
                <Box
                    w='full'
                    alignItems='center'
                    textAlign='center'
                    backgroundColor={successColor}
                    color={fontColor}>
                    <Text fontSize={['lg', '2xl']} fontWeight='500'>
                        {msg}
                    </Text>
                </Box>
            )}
            {type === 'error' && (
                <Box
                    w='full'
                    alignItems='center'
                    textAlign='center'
                    backgroundColor={errorColor}
                    color={fontColor}>
                    <Text fontSize={['lg', '2xl']} fontWeight='500'>
                        {msg}
                    </Text>
                </Box>
            )}
        </>
    );
};
