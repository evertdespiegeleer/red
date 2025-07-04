import { AppProvider } from './Providers.js'
import { Main } from './Main.js'

export function App() {

	return (
		<AppProvider>
			<Main />
		</AppProvider>
    )
};