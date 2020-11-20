import logo from './soccerball.svg';
import './App.css';
import './materialize.min.css'
import RegisterPage from './pages/registerPage';
import { Provider } from 'react-redux';
import store from './redux/reducers'
// import M from 'materialize-css'; 

function App() {
  return (
    <Provider store={store}>
      <div className='wrapper'>
        <div className="logo">
          <span className="helper"></span>
          <img src={logo} className="App-logo" alt="logo" /></div>
        <div className="header">HEADER</div>
        {window.innerWidth >= 900 ? <div className="leftmenu">MENU</div> : null}
        {/* <div className="content"><div className="foo"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, assumenda optio laborum voluptatibus dolorem nemo. Incidunt deserunt blanditiis reiciendis totam excepturi laudantium voluptate molestias necessitatibus fugit expedita id, dolorem nihil placeat doloremque qui, eligendi sequi tempore. Eaque quam vel tempore officiis cupiditate error molestias at! Voluptas reprehenderit ullam dignissimos quidem vel impedit magnam nostrum debitis non laboriosam adipisci, distinctio aliquam nam rerum optio dolor dolorem deserunt saepe porro sunt. Aperiam neque commodi sed necessitatibus sit impedit suscipit nam illum corrupti porro praesentium, deserunt atque quo aspernatur rerum ab ipsa facilis saepe repudiandae accusamus esse cupiditate. Praesentium similique laboriosam quam accusamus quasi adipisci necessitatibus, odio natus earum, doloremque nisi expedita a velit voluptatibus? Quasi ut aliquid unde omnis facilis quas similique mollitia ducimus eaque, eos, earum, officiis quia provident praesentium perspiciatis ad impedit aut voluptatem necessitatibus a laborum soluta dolore. Perspiciatis totam velit exercitationem laudantium! Vero sapiente quibusdam culpa. Ipsam sapiente voluptatum adipisci! At molestias neque itaque, ea sit beatae praesentium atque temporibus, eum illum expedita quis est hic iusto illo assumenda ex aliquam perspiciatis modi. Atque, numquam veniam tenetur perferendis officiis debitis voluptas facere natus molestias autem, incidunt dolores doloribus quia minus quas. Aliquam fuga mollitia commodi quis voluptas, atque est in alias doloremque dignissimos modi, praesentium dolorem adipisci omnis soluta, nihil possimus doloribus quaerat assumenda veniam voluptatibus amet rem nam distinctio. Accusantium unde iure, natus non necessitatibus vitae iste. Reiciendis, fugiat totam? Ad voluptate voluptas tempora vitae, asperiores possimus pariatur natus excepturi. Sed vitae optio nihil modi quos qui? Pariatur, architecto ab? Modi sed, ipsam libero dignissimos iste adipisci qui quia autem aspernatur aut recusandae quidem, debitis beatae non. Delectus incidunt sint illo, facere accusantium ducimus rerum tempora corporis cumque pariatur repellendus natus optio aliquam quod reiciendis. Similique blanditiis qui nisi aperiam eum architecto accusamus officiis commodi, sint iusto accusantium, voluptatum animi. Quae officia ad repellendus sint aspernatur maiores eum eaque. At, debitis reprehenderit non molestiae asperiores labore vero similique eius pariatur? Facere temporibus fuga voluptatum, molestias excepturi quae dignissimos, voluptas quas magnam dolore maxime. Deleniti dolore, dolorum id repudiandae, temporibus maiores veniam illum quidem repellat porro ut similique, sequi reiciendis vero ipsam? Assumenda obcaecati eligendi beatae, nihil quaerat ab excepturi voluptatum tempora consequuntur maiores quam deserunt ipsam laudantium incidunt hic ipsa doloremque accusamus officiis? Accusantium veniam incidunt quidem deleniti dicta ipsa assumenda optio modi fuga blanditiis minus eius eaque molestias ex facilis aliquam doloremque quo at tempora quia, cum dolorem sapiente, mollitia quos. Ab modi accusantium voluptatibus eaque velit iure tempora, aperiam earum cumque reprehenderit voluptas atque enim laboriosam suscipit aliquid fuga aut, a repellendus dolores qui sint temporibus dicta voluptates vero! Laudantium tempora qui quis! Dolorum culpa ad, exercitationem quos sequi provident ullam ex repudiandae saepe nihil, minima pariatur optio dicta laudantium doloribus fugit! Veniam, labore architecto cumque quae cupiditate corrupti culpa, vero laudantium praesentium harum amet quos voluptas dicta itaque ad facere sapiente recusandae consequuntur animi? Aspernatur saepe vero aliquid minus praesentium repellendus tempore sunt accusamus porro sapiente pariatur dolor assumenda aut dicta, quae ad? Quibusdam.</div>
      </div> */}
        <div className="content">
          <RegisterPage />
        </div>
        <div className="footer">FOOTER</div>
      </div >
    </Provider>
  );
}

export default App;
