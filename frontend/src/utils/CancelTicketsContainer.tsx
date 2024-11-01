
import { useAuth } from '.././utils/authContext';
import CancelTicketsLogin from '../pages/Cancel-Tickets-Login/CancelTicketsLogin';
import CancelTickets from '../pages/Cancel-Tickets/Cancel-Tickets';

const CancelTicketsContainer = () => {
  const { isAuthenticated } = useAuth();
console.log("Rendering CancelTicketsContainer. isAuthenticated:", isAuthenticated);
  return isAuthenticated ? <CancelTicketsLogin /> : <CancelTickets />;
};

export default CancelTicketsContainer;
