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
  ImageField,
  Datagrid
} from 'react-admin'
import DateFilters from '../../elements/DateFilters'
import DuplicateButton from '../../elements/DuplicateButton'

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

export const ImagesList = props => (
  <List
    {...props}
    title='Images List'
    filters={<Filters />}
  >
    <Datagrid
      rowClick='edit'
    >
      <ImageField
        source={'cloudinary'}
      />
      <DateField source='createdAt' />
      <DateField source='updatedAt' />
    </Datagrid>
  </List>
)

export const ImagesCreate = (props) => (
  <Create
    {...props}
    title='Image Create'
    actions={<CreateActions />}
  >
    <SimpleForm>
      <TextInput
        source={'cloudinary'}
        validate={required()}
      />
    </SimpleForm>
  </Create>
)

export const ImagesEdit = (props) => (
  <Edit
    {...props}
    actions={<EditActions />}
    title='Image Edit'
  >
    <TabbedForm redirect={false}>
      <FormTab replace label='summary'>
        <TextField source='id' />
        <TextInput
          source={'cloudinary'}
        />
        <ImageField
          source={'cloudinary'}
        />
        <DateField source='createdAt' showTime />
        <DateField source='updatedAt' showTime />
      </FormTab>
    </TabbedForm>
  </Edit>
)
