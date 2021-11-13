import { ReactNode, useContext } from 'react';
import {
    Box,
    Flex,
    Avatar,
    Link,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
    IconButton,
    Heading,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import AppContext from '../context/AppContext';

const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={'#'}>
        {children}
    </Link>
);

export const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { state } = useContext(AppContext);
    const { isLoggedIn } = state.user;
    return (
        <>
            <Box px={4}>
                <Flex
                    h={16}
                    alignItems={'center'}
                    justifyContent={'space-between'}>
                    <Box>
                        <Heading fontSize={['xl']}>Gmeet Ams</Heading>
                    </Box>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
                            <IconButton
                                aria-label={'Toggle dark mode'}
                                icon={
                                    colorMode === 'light' ? (
                                        <MoonIcon />
                                    ) : (
                                        <SunIcon />
                                    )
                                }
                                isRound={true}
                                onClick={toggleColorMode}
                            />
                            {isLoggedIn && (
                                <Menu>
                                    <MenuButton
                                        as={Button}
                                        rounded={'full'}
                                        variant={'link'}
                                        cursor={'pointer'}
                                        minW={0}>
                                        <Avatar
                                            size={'sm'}
                                            src={
                                                'https://avatars.dicebear.com/api/male/username.svg'
                                            }
                                        />
                                    </MenuButton>

                                    <MenuList alignItems={'center'}>
                                        <br />
                                        <Center>
                                            <Avatar
                                                size={'2xl'}
                                                src={
                                                    'https://avatars.dicebear.com/api/male/username.svg'
                                                }
                                            />
                                        </Center>
                                        <br />
                                        <Center>
                                            <p>Username</p>
                                        </Center>
                                        <br />
                                        <MenuDivider />
                                        <MenuItem>Your Servers</MenuItem>
                                        <MenuItem>Account Settings</MenuItem>
                                        <MenuItem>Logout</MenuItem>
                                    </MenuList>
                                </Menu>
                            )}
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
};
