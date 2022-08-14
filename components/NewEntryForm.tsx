import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Checkbox } from './Checkbox';
import { Snackbar } from './Snackbar';

interface Props {
  lists: string[];
}

interface FormData {
  term: string;
  definition: string;
  description: string;
  list: string;
  isIscVerb: boolean;
  isIrregularVerb: boolean;
  conjugation: {
    io: string;
    tu: string;
    lei: string;
    noi: string;
    voi: string;
    loro: string;
  }
};

const InputStyle = styled.input`
  min-height: 2rem;
  width: 250px;
  border: solid 1px var(--color-primary-light);
  font: inherit;
`;

const ButtonStyle = styled.input`
  height: 3rem;
  min-width: 60px;
  border: none;
  background-color: var(--color-primary);
  color: var(--color-text-light);
  :hover {
    background-color: var(--color-primary-light);
  }
`;

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

function wordExists(word: string, list: string[]) {
  return list.includes(word);
}

export function NewEntryForm({ lists }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({ mode: 'onChange' });

  const watchList = watch('list');
  const watchIrregular = watch('isIrregularVerb');

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // On submit, store the new word/phrase in local storage
  const onSubmit: SubmitHandler<FormData> = (data) => {
    try {
      const existingString = localStorage.getItem(data.list);
      if (existingString) {
        const existing = JSON.parse(existingString);
        existing.push(data);
        localStorage.setItem(data.list, JSON.stringify(existing));
      } else {
        localStorage.setItem(data.list, JSON.stringify([data]));
      }

      setSnackbarMessage('Successfully added');
    } catch (err) {
      console.log(err);
      setSnackbarMessage('Something went wrong adding that');
    } finally {
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 2000)
    }
  }

  return (<>
    <FormStyle onSubmit={handleSubmit(onSubmit)}>
      <InputStyle {...register('term', { required: 'You need to provide the Italian' })} placeholder="Italian word/phrase" />
      {errors.term && <p>{errors.term.message}</p>}
      <InputStyle {...register('definition', { required: 'You need to provide the English' })} placeholder="English translation" />
      {errors.definition && <p>{errors.definition.message}</p>}
      <InputStyle as="textarea" {...register('description')} placeholder='Optional further detail' rows={3} />
      <InputStyle as="select" {...register('list')}>
        {lists.map(list => <option key={list} value={list}>{list}</option>)}
      </InputStyle>
      {watchList === 'verbs' && <Checkbox label='isc verb?' {...register('isIscVerb')} />}
      {watchList === 'verbs' && <Checkbox label='Irregular verb?' {...register('isIrregularVerb')} />}
      {watchIrregular && <>
        <InputStyle {...register('conjugation.io')} placeholder={'io...'} />
        <InputStyle {...register('conjugation.tu')} placeholder={'tu...'} />
        <InputStyle {...register('conjugation.lei')} placeholder={'lui/lei...'} />
        <InputStyle {...register('conjugation.noi')} placeholder={'noi...'} />
        <InputStyle {...register('conjugation.voi')} placeholder={'voi...'} />
        <InputStyle {...register('conjugation.loro')} placeholder={'loro...'} />
      </>}
      <ButtonStyle type="submit" />
      {showSnackbar && <Snackbar>{snackbarMessage}</Snackbar>}
    </FormStyle>
  </>)
}