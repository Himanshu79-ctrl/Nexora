import styles from './Button.module.css'

const Button = ({
  children, variant = 'primary', size = 'md',
  fullWidth, loading, disabled, onClick, type = 'button', icon, className = '',
}) => {
  const cls = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.full : '',
    loading  ? styles.loading : '',
    className,
  ].join(' ')

  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled || loading}>
      {loading ? (
        <span className={styles.spinner} />
      ) : (
        <>
          {icon && <span className={styles.icon}>{icon}</span>}
          {children}
        </>
      )}
    </button>
  )
}

export default Button