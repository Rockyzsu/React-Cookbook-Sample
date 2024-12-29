import './App.css'
import {
  Admin,
  Create,
  Datagrid,
  Filter,
  List,
  Resource,
  SimpleForm,
  TextField,
  TextInput,
} from 'react-admin'
// import jsonServerProvider from 'ra-data-json-server';
// import { UserList } from './UserList'; // 导入自定义的用户列表组件
// const dataProvider = jsonServerProvider('http://localhost:3001/api');

const customDataProvider = {
  getList: (resource, params) => {
    return fetch('http://localhost:3001/' + resource)
     .then(response => response.json())
     .then(json => {
      console.log('==========',json);
        if (json.success) {
          return {data:json.data,total:json.data.length};
        } else {
          throw new Error('API error');
        }
      });
  }
};

const CreateMessage = (props) => {
  return (
    <Create title="Create a Message" {...props}>
      <SimpleForm>
        <TextInput source="author" />
        <TextInput multiline source="text" />
      </SimpleForm>
    </Create>
  )
}

const MessageFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Content" source="content" />
    <TextInput label="Title" source="title" />
    <TextInput label="Search" source="q" alwaysOn />
  </Filter>
)

const ListMessages = (props) => {
  return (
    <List {...props} filters={<MessageFilter />}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="content" />
        <TextField source="title" />
      </Datagrid>
    </List>
  )
}

function App() {


  return (
    <div className="App">
      {customDataProvider && (
        <Admin dataProvider={customDataProvider}>
          <Resource
            name="api"
            list={ListMessages}
            // create={CreateMessage}
          />
        </Admin>
      )}
    </div>
  )
}

export default App
