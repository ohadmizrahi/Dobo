import React from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
    fullName: yup.string().required('Your Full Name is required'),
    email: yup.string().email().required(),
    phoneNumber: yup.string().min(10).max(10).required(),
    address: yup.string().required(),
    birthDate: yup.string().required(),
    image: yup.string(),
    password: yup.string().min(8).max(20).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null]).required(),
});

export const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <View>
            <TextInput
                placeholder="Full Name.."
                onChangeText={(text) => register('fullName', { required: 'Your Full Name is required', value: text })}
            />
            <Text>{errors.fullName?.message}</Text>

            <TextInput
                placeholder="Email.."
                onChangeText={(text) => register('email', { required: 'Email is required', value: text })}
            />
            <Text>{errors.email?.message}</Text>

            <TextInput
                placeholder="Phone Number.."
                onChangeText={(text) => register('phoneNumber', { required: 'Phone Number is required', value: text })}
            />
            <Text>{errors.phoneNumber?.message}</Text>

            <TextInput
                placeholder="Address.."
                onChangeText={(text) => register('address', { required: 'Address is required', value: text })}
            />
            <Text>{errors.address?.message}</Text>

            <TextInput
                placeholder="Birth Date.."
                onChangeText={(text) => register('birthDate', { required: 'Birth Date is required', value: text })}
            />
            <Text>{errors.birthDate?.message}</Text>

            <TextInput
                placeholder="Password.."
                onChangeText={(text) => register('password', { required: 'Password is required', value: text })}
            />
            <Text>{errors.password?.message}</Text>

            <TextInput
                placeholder="Confirm Password.."
                onChangeText={(text) => register('confirmPassword', { required: 'Confirm Password is required', value: text })}
            />
            <Text>{errors.confirmPassword?.message}</Text>
            
            <TextInput
                placeholder="Image.."
                onChangeText={(text) => register('image', { value: text })}
            />
            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
    );
};


