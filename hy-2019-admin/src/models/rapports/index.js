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

export const RapportsList = props => (
	<List
		{...props}
		filters={<Filters />}
		title='Rapport List'
	>
		<Datagrid
			rowClick='edit'
		>
			<TextField
				source={'placeName'}
				validate={required()}
			/>
			<TextField
				source={'placeStreet'}
				validate={required()}
			/>
			<TextField
				source={'estimatedButts'}
				validate={required()}
			/>
			<DateField source='createdAt' />
		</Datagrid>
	</List>
)

export const RapportsEdit = (props) => (
	<Edit
		{...props}
		title='Rapport Edit'
		actions={<EditActions />}
	>
		<TabbedForm redirect={false}>
			<FormTab replace label='summary'>
				<TextField source='id' />
				<TextField
					source={'placeName'}
					validate={required()}
				/>
				<TextField
					source={'placeStreet'}
					validate={required()}
				/>
				<TextField
					source={'estimatedButts'}
					validate={required()}
				/>
				<DateField source='createdAt' showTime />
			</FormTab>
		</TabbedForm>
	</Edit>
)
