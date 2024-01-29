import { Pages } from "@src/pages"
import { BoardProvider } from './contexts';
 
function App() {

  return (
	<BoardProvider>
		<Pages.MainPage />
	</BoardProvider>
  )
}

export default App
