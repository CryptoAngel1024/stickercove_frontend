import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Purchase as PurchaseComponent } from "components/Purchase";
import { crateCommentAction } from "redux/Reducers/Comment";
import { commentStateSelector } from "redux/Selectors";

const Purchase = ({ commentStore, crateCommentAction }) => {
  return <PurchaseComponent />;
};

export const mapStateToProps = createStructuredSelector({
  commentStore: commentStateSelector,
});

const mapDispatchToProps = {
  crateCommentAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
