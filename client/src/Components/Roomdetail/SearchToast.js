import { useToasts } from 'react-toast-notifications';

function SearchToast({ desc, status }) {
    const { addToast } = useToasts();
    addToast({desc}, { appearance: {status}, autoDismiss: true, autoDismissTimeout: 1500 });
}

export default SearchToast
