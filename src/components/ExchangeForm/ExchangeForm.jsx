import { RiExchangeDollarFill } from 'react-icons/ri';
import styles from './ExchangeForm.module.css';

const ExchangeForm = () => {
  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const { value } = form.elements.currency;
    const [amount, from, to] = value.split(' ');
    // form.reset();
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        title="Request format 15 USD in UAH"
        name="currency"
        type="text"
        className={styles.input}
        pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
        required
      />
    </form>
  );
};

export default ExchangeForm;
