import ContactForm from './components/ContactForm';

const App = () => {
  require('dotenv').config()
  return (
    <div className='App'>
      <div className='container'>
        <h1 className='text-center'>React Contact Form</h1>
        <ContactForm />
      </div>
    </div>
  );
};

export default App;
