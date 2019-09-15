import React from 'react'

import {
  List,
  DateField,
  TextField,
  Filter,
  SearchInput,
  Create,
  SimpleForm,
  TextInput,
  Edit,
  CardActions,
  ListButton,
  TabbedForm,
  FormTab,
  required,
  Datagrid,
  NumberField,
  NumberInput,
  SelectInput
} from 'react-admin'
import DateFilters from '../../elements/DateFilters'
import DuplicateButton from '../../elements/DuplicateButton'
import inflection from 'inflection'


export const Filters = (props) => (
  <Filter {...props}>
    <SearchInput
      label='Email'
      source={`email.$regex`}
      alwaysOn
    />

    {DateFilters}
  </Filter>
)

const CreateActions = ({ basePath }) => (
  <CardActions>
    <ListButton basePath={basePath} />
  </CardActions>
)

const EditActions = ({ basePath, data }) => (
  <CardActions>
    <ListButton basePath={basePath} />
    <DuplicateButton basePath={basePath} record={data} />
  </CardActions>
)

export const UserList = props => (
  <List
    {...props}
    filters={<Filters />}
    title='User List'
  >
    <Datagrid
      rowClick='edit'
    >
      <TextField source='email' />
      <DateField source='createdAt' />
      <DateField source='updatedAt' />
      <NumberField source='totalPoints'/>
      <NumberField source='spentPoints'/>
      <NumberField source='level' />
      <TextField source='rank' />
    </Datagrid>
  </List>
)

export const UserCreate = (props) => (
  <Create
    {...props}
    title='User Create'
    actions={<CreateActions />}
  >
    <SimpleForm>
      <TextInput
        source={'email'}
        type='email'
        validate={required()}
      />
      <TextInput
        source={'password'}
        type='password'
        validate={required()}
      />
    </SimpleForm>
  </Create>
)

function getChoices (object = {}) {
  return Object.keys(object).map(key => ({
    id: object[key],
    name: inflection.transform(object[key], ['singularize', 'capitalize'])
  }))
}

const rankTitle = ['Novice', 'Intermediate', 'Pro', 'Expert', 'Master', 'Grand Master', 'Perfect']


export const UserEdit = (props) => (
  <Edit
    {...props}
    actions={<EditActions />}
    title='User Edit'
  >
    <TabbedForm redirect={false}>
      <FormTab replace label='summary'>
        <TextField source='id' />
        <TextInput
          source={'email'}
          type='email'
          validate={required()}
        />
        <TextInput
          source={'password'}
          type='password'
        />
        <DateField source='createdAt' showTime />
        <DateField source='updatedAt' showTime />
        <NumberInput source='totalPoints'/>
        <NumberInput source='spentPoints'/>
        <NumberInput source='level' />
        <SelectInput
        source={'rank'}
        choices={getChoices(rankTitle)}
        />
      </FormTab>
    </TabbedForm>
  </Edit>
)
