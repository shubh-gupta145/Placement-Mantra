import { MdSearch } from "react-icons/md";
import styles from "./Search_button.module.css"
function Search_button(){
return(
    <>
        <div className={styles.searchBox}>
      <MdSearch className={styles.searchIcon} />
    </div>
    </>
);
}
export default Search_button;