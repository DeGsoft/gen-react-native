import { getLocalizedText } from '@/languages/languages';
import { yupResolver } from "@hookform/resolvers/yup";
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Button, Platform, StyleSheet, View } from 'react-native';
import * as yup from "yup";
import { TextInputController } from './text-input-controller';

const schema = yup
  .object({
    text: yup.string().min(4).max(12).required(),
  })
  .required();

type FormValues = yup.InferType<typeof schema>

export const NewTodoForm: React.FC = ({ onSave }) => {
  const { ...methods } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    onSave(data?.text);
    methods.reset();
  };

  const FormContent = (
    <View>
      <TextInputController
        name="text"
        placeholder={getLocalizedText('what_do_you_want_to_do_today')}
        keyboardType="email-address"
      />
      <Button title="+" onPress={methods.handleSubmit(onSubmit)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        {Platform.OS == 'web' ? (
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {FormContent}
          </form>
        ) : (
          FormContent
        )}
      </FormProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: 200,
  },
});
