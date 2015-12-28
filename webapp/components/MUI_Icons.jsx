import React from 'react';
import Relay from 'react-relay';

import Card from 'material-ui/lib/card/card';
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';
import ListItem from 'material-ui/lib/lists/list-item';

import ActionAccessibility from 'material-ui/lib/svg-icons/action/accessibility';
import ActionAccessible from 'material-ui/lib/svg-icons/action/accessible';
import ActionAccountBalanceWallet from 'material-ui/lib/svg-icons/action/account-balance-wallet';
import ActionAccountBalance from 'material-ui/lib/svg-icons/action/account-balance';
import ActionAccountBox from 'material-ui/lib/svg-icons/action/account-box';
import ActionAccountCircle from 'material-ui/lib/svg-icons/action/account-circle';
import ActionAddShoppingCart from 'material-ui/lib/svg-icons/action/add-shopping-cart';
import ActionAlarmAdd from 'material-ui/lib/svg-icons/action/alarm-add';
import ActionAlarmOff from 'material-ui/lib/svg-icons/action/alarm-off';
import ActionAlarmOn from 'material-ui/lib/svg-icons/action/alarm-on';
import ActionAlarm from 'material-ui/lib/svg-icons/action/alarm';
import ActionAllOut from 'material-ui/lib/svg-icons/action/all-out';
import ActionAndroid from 'material-ui/lib/svg-icons/action/android';
import ActionAnnouncement from 'material-ui/lib/svg-icons/action/announcement';
import ActionAspectRatio from 'material-ui/lib/svg-icons/action/aspect-ratio';
import ActionAssessment from 'material-ui/lib/svg-icons/action/assessment';
import ActionAssignmentInd from 'material-ui/lib/svg-icons/action/assignment-ind';
import ActionAssignmentLate from 'material-ui/lib/svg-icons/action/assignment-late';
import ActionAssignmentReturn from 'material-ui/lib/svg-icons/action/assignment-return';
import ActionAssignmentReturned from 'material-ui/lib/svg-icons/action/assignment-returned';
import ActionAssignmentTurnedIn from 'material-ui/lib/svg-icons/action/assignment-turned-in';
import ActionAssignment from 'material-ui/lib/svg-icons/action/assignment';
import ActionAutorenew from 'material-ui/lib/svg-icons/action/autorenew';
import ActionBackup from 'material-ui/lib/svg-icons/action/backup';
import ActionBook from 'material-ui/lib/svg-icons/action/book';
import ActionBookmarkBorder from 'material-ui/lib/svg-icons/action/bookmark-border';
import ActionBookmark from 'material-ui/lib/svg-icons/action/bookmark';
import ActionBugReport from 'material-ui/lib/svg-icons/action/bug-report';
import ActionBuild from 'material-ui/lib/svg-icons/action/build';
import ActionCached from 'material-ui/lib/svg-icons/action/cached';
import ActionCameraEnhance from 'material-ui/lib/svg-icons/action/camera-enhance';
import ActionCardGiftcard from 'material-ui/lib/svg-icons/action/card-giftcard';
import ActionCardMembership from 'material-ui/lib/svg-icons/action/card-membership';
import ActionCardTravel from 'material-ui/lib/svg-icons/action/card-travel';
import ActionChangeHistory from 'material-ui/lib/svg-icons/action/change-history';
import ActionCheckCircle from 'material-ui/lib/svg-icons/action/check-circle';
import ActionChromeReaderMode from 'material-ui/lib/svg-icons/action/chrome-reader-mode';
import ActionClass from 'material-ui/lib/svg-icons/action/class';
import ActionCode from 'material-ui/lib/svg-icons/action/code';
import ActionCompareArrows from 'material-ui/lib/svg-icons/action/compare-arrows';
import ActionCopyright from 'material-ui/lib/svg-icons/action/copyright';
import ActionCreditCard from 'material-ui/lib/svg-icons/action/credit-card';
import ActionDashboard from 'material-ui/lib/svg-icons/action/dashboard';
import ActionDateRange from 'material-ui/lib/svg-icons/action/date-range';
import ActionDelete from 'material-ui/lib/svg-icons/action/delete';
import ActionDescription from 'material-ui/lib/svg-icons/action/description';
import ActionDns from 'material-ui/lib/svg-icons/action/dns';
import ActionDoneAll from 'material-ui/lib/svg-icons/action/done-all';
import ActionDone from 'material-ui/lib/svg-icons/action/done';
import ActionDonutLarge from 'material-ui/lib/svg-icons/action/donut-large';
import ActionDonutSmall from 'material-ui/lib/svg-icons/action/donut-small';

class MUI_Icons extends React.Component
{
  render( )
  {
    return (
      <div>
        <Card>
          <List>
            <ListItem key="0" primaryText="ActionAccessibility" leftIcon={<ActionAccessibility />} />
            <Divider inset={true} />
            <ListItem key="1" primaryText="ActionAccessible" leftIcon={<ActionAccessible />} />
            <Divider inset={true} />
            <ListItem key="2" primaryText="ActionAccountBalanceWallet" leftIcon={<ActionAccountBalanceWallet />} />
            <Divider inset={true} />
            <ListItem key="3" primaryText="ActionAccountBalance" leftIcon={<ActionAccountBalance />} />
            <Divider inset={true} />
            <ListItem key="4" primaryText="ActionAccountBox" leftIcon={<ActionAccountBox />} />
            <Divider inset={true} />
            <ListItem key="5" primaryText="ActionAccountCircle" leftIcon={<ActionAccountCircle />} />
            <Divider inset={true} />
            <ListItem key="6" primaryText="ActionAddShoppingCart" leftIcon={<ActionAddShoppingCart />} />
            <Divider inset={true} />
            <ListItem key="7" primaryText="ActionAlarmAdd" leftIcon={<ActionAlarmAdd />} />
            <Divider inset={true} />
            <ListItem key="8" primaryText="ActionAlarmOff" leftIcon={<ActionAlarmOff />} />
            <Divider inset={true} />
            <ListItem key="9" primaryText="ActionAlarmOn" leftIcon={<ActionAlarmOn />} />
            <Divider inset={true} />
            <ListItem key="10" primaryText="ActionAlarm" leftIcon={<ActionAlarm />} />
            <Divider inset={true} />
            <ListItem key="11" primaryText="ActionAllOut" leftIcon={<ActionAllOut />} />
            <Divider inset={true} />
            <ListItem key="12" primaryText="ActionAndroid" leftIcon={<ActionAndroid />} />
            <Divider inset={true} />
            <ListItem key="13" primaryText="ActionAnnouncement" leftIcon={<ActionAnnouncement />} />
            <Divider inset={true} />
            <ListItem key="14" primaryText="ActionAspectRatio" leftIcon={<ActionAspectRatio />} />
            <Divider inset={true} />
            <ListItem key="15" primaryText="ActionAssessment" leftIcon={<ActionAssessment />} />
            <Divider inset={true} />
            <ListItem key="16" primaryText="ActionAssignmentInd" leftIcon={<ActionAssignmentInd />} />
            <Divider inset={true} />
            <ListItem key="17" primaryText="ActionAssignmentLate" leftIcon={<ActionAssignmentLate />} />
            <Divider inset={true} />
            <ListItem key="18" primaryText="ActionAssignmentReturn" leftIcon={<ActionAssignmentReturn />} />
            <Divider inset={true} />
            <ListItem key="19" primaryText="ActionAssignmentReturned" leftIcon={<ActionAssignmentReturned />} />
            <Divider inset={true} />
            <ListItem key="20" primaryText="ActionAssignmentTurnedIn" leftIcon={<ActionAssignmentTurnedIn />} />
            <Divider inset={true} />
            <ListItem key="21" primaryText="ActionAssignment" leftIcon={<ActionAssignment />} />
            <Divider inset={true} />
            <ListItem key="22" primaryText="ActionAutorenew" leftIcon={<ActionAutorenew />} />
            <Divider inset={true} />
            <ListItem key="23" primaryText="ActionBackup" leftIcon={<ActionBackup />} />
            <Divider inset={true} />
            <ListItem key="24" primaryText="ActionBook" leftIcon={<ActionBook />} />
            <Divider inset={true} />
            <ListItem key="25" primaryText="ActionBookmarkBorder" leftIcon={<ActionBookmarkBorder />} />
            <Divider inset={true} />
            <ListItem key="26" primaryText="ActionBookmark" leftIcon={<ActionBookmark />} />
            <Divider inset={true} />
            <ListItem key="27" primaryText="ActionBugReport" leftIcon={<ActionBugReport />} />
            <Divider inset={true} />
            <ListItem key="28" primaryText="ActionBuild" leftIcon={<ActionBuild />} />
            <Divider inset={true} />
            <ListItem key="29" primaryText="ActionCached" leftIcon={<ActionCached />} />
            <Divider inset={true} />
            <ListItem key="30" primaryText="ActionCameraEnhance" leftIcon={<ActionCameraEnhance />} />
            <Divider inset={true} />
            <ListItem key="31" primaryText="ActionCardGiftcard" leftIcon={<ActionCardGiftcard />} />
            <Divider inset={true} />
            <ListItem key="32" primaryText="ActionCardMembership" leftIcon={<ActionCardMembership />} />
            <Divider inset={true} />
            <ListItem key="33" primaryText="ActionCardTravel" leftIcon={<ActionCardTravel />} />
            <Divider inset={true} />
            <ListItem key="34" primaryText="ActionChangeHistory" leftIcon={<ActionChangeHistory />} />
            <Divider inset={true} />
            <ListItem key="35" primaryText="ActionCheckCircle" leftIcon={<ActionCheckCircle />} />
            <Divider inset={true} />
            <ListItem key="36" primaryText="ActionChromeReaderMode" leftIcon={<ActionChromeReaderMode />} />
            <Divider inset={true} />
            <ListItem key="37" primaryText="ActionClass" leftIcon={<ActionClass />} />
            <Divider inset={true} />
            <ListItem key="38" primaryText="ActionCode" leftIcon={<ActionCode />} />
            <Divider inset={true} />
            <ListItem key="39" primaryText="ActionCompareArrows" leftIcon={<ActionCompareArrows />} />
            <Divider inset={true} />
            <ListItem key="40" primaryText="ActionCopyright" leftIcon={<ActionCopyright />} />
            <Divider inset={true} />
            <ListItem key="41" primaryText="ActionCreditCard" leftIcon={<ActionCreditCard />} />
            <Divider inset={true} />
            <ListItem key="42" primaryText="ActionDashboard" leftIcon={<ActionDashboard />} />
            <Divider inset={true} />
            <ListItem key="43" primaryText="ActionDateRange" leftIcon={<ActionDateRange />} />
            <Divider inset={true} />
            <ListItem key="44" primaryText="ActionDelete" leftIcon={<ActionDelete />} />
            <Divider inset={true} />
            <ListItem key="45" primaryText="ActionDescription" leftIcon={<ActionDescription />} />
            <Divider inset={true} />
            <ListItem key="46" primaryText="ActionDns" leftIcon={<ActionDns />} />
            <Divider inset={true} />
            <ListItem key="47" primaryText="ActionDoneAll" leftIcon={<ActionDoneAll />} />
            <Divider inset={true} />
            <ListItem key="48" primaryText="ActionDone" leftIcon={<ActionDone />} />
            <Divider inset={true} />
            <ListItem key="49" primaryText="ActionDonutLarge" leftIcon={<ActionDonutLarge />} />
            <Divider inset={true} />
            <ListItem key="50" primaryText="ActionDonutSmall" leftIcon={<ActionDonutSmall />} />
            <Divider inset={true} />
          </List>
        </Card>
      </div>
    )
  }
};

export default Relay.createContainer(MUI_Icons, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        totalCount,
      }
    `,
  },
});