import Link from "./Link";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch({
        type: "SET_VISIBILITY_FILTER",
        filter: ownProps.filter,
      });
    },
  };
};

const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);

export default FilterLink;

// ** Container component without using connect method to get props from redux store **

// class FilterLink extends Component {
//   componentDidMount() {
//     const { store } = this.context;
//     this.unsubscribe = store.subscribe(() => this.forceUpdate());
//     console.log("Current State - CDM FILTERLINK");
//     console.log(store.getState());
//     console.log("--------------");
//   }

//   componentWillUnmount() {
//     this.unsubscribe();
//     console.log("Current State - UMOUNT FILTERLINK");
//     console.log(store.getState());
//     console.log("--------------");
//   }

//   render() {
//     const { filter, children } = this.props;
//     const { store } = this.context;
//     const state = store.getState();

//     const onFilterClick = () => {
//       store.dispatch({
//         type: "SET_VISIBILITY_FILTER",
//         filter,
//       });
//     };

//     return (
//       <Link active={filter === state.visibilityFilter} onClick={onFilterClick}>
//         {children}
//       </Link>
//     );
//   }
// }
