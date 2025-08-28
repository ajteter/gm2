import styles from './game.module.css';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  // The .emptyIcon class from globals.css provides a spinner.
  return (
    <div className={styles.container}>
      <div className="emptyIcon" />
    </div>
  );
}
