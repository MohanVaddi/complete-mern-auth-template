import { FormControl } from '@chakra-ui/form-control';
import {
    GridItem,
    SimpleGrid,
    VStack,
    useBreakpointValue,
    FormLabel,
    Input,
    Select,
    Button,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface StudentHomeProps {}

export const StudentHome: React.FC<StudentHomeProps> = () => {
    const subjects = ['AI', 'ML', 'ACC', 'IR', 'DIP'];
    const colspan = useBreakpointValue({ base: 2, md: 1 });
    const [startDate, setStartDate] = useState<any>(new Date());
    const handleDateSelect = (date: any) => {
        console.log(date);
        setStartDate(date);
    };
    return (
        <VStack padding={[5, 8, 12]} minH={'100vh'}>
            <SimpleGrid columns={2} columnGap={3} rowGap={6} w='full'>
                <GridItem colSpan={colspan}>
                    <FormControl>
                        <FormLabel>Date</FormLabel>
                        <Input
                            as={DatePicker}
                            selected={startDate}
                            onSelect={handleDateSelect}
                            dateFormat='dd/MM/yyyy'
                        />
                    </FormControl>
                </GridItem>
                <GridItem colSpan={colspan}>
                    <FormControl>
                        <FormLabel>Subject</FormLabel>
                        <Select>
                            {subjects &&
                                subjects.map((subject, index) => (
                                    <option key={index} value={subject}>
                                        {subject}
                                    </option>
                                ))}
                        </Select>
                    </FormControl>
                </GridItem>
                <GridItem colSpan={2}>
                    <Button variant='primary' size='sm'>
                        View Attendance
                    </Button>
                </GridItem>
            </SimpleGrid>
        </VStack>
    );
};
