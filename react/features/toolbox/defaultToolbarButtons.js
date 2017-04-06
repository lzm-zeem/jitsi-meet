/* @flow */

import React from 'react';

import UIEvents from '../../../service/UI/UIEvents';

declare var APP: Object;
declare var config: Object;
declare var JitsiMeetJS: Object;

/**
 * Shows SIP number dialog.
 *
 * @returns {void}
 */
function _showSIPNumberInput() {
    const defaultNumber = config.defaultSipNumber || '';
    const msgString
        = `<input class="input-control" name="sipNumber" type="text" value="${
            defaultNumber}" autofocus>`;

    APP.UI.messageHandler.openTwoButtonDialog({
        focus: ':input:first',
        leftButtonKey: 'dialog.Dial',
        msgString,
        titleKey: 'dialog.sipMsg',

        // eslint-disable-next-line max-params
        submitFunction(event, value, message, formValues) {
            const { sipNumber } = formValues;

            if (value && sipNumber) {
                APP.UI.emitEvent(UIEvents.SIP_DIAL, sipNumber);
            }
        }
    });
}

/**
 * All toolbar buttons' descriptors.
 */
export default {
    /**
     * The descriptor of the camera toolbar button.
     */
    camera: {
        classNames: [ 'button', 'icon-camera' ],
        enabled: true,
        filmStripOnlyEnabled: true,
        id: 'toolbar_button_camera',
        onClick() {
            if (APP.conference.videoMuted) {
                JitsiMeetJS.analytics.sendEvent('toolbar.video.enabled');
                APP.UI.emitEvent(UIEvents.VIDEO_MUTED, false);
            } else {
                JitsiMeetJS.analytics.sendEvent('toolbar.video.disabled');
                APP.UI.emitEvent(UIEvents.VIDEO_MUTED, true);
            }
        },
        shortcut: 'V',
        shortcutAttr: 'toggleVideoPopover',
        shortcutFunc() {
            JitsiMeetJS.analytics.sendEvent('shortcut.videomute.toggled');
            APP.conference.toggleVideoMuted();
        },
        shortcutDescription: 'keyboardShortcuts.videoMute',
        tooltipKey: 'toolbar.videomute'
    },

    /**
     * The descriptor of the chat toolbar button.
     */
    chat: {
        classNames: [ 'button', 'icon-chat' ],
        enabled: true,
        html: <span className = 'badge-round'>
            <span id = 'unreadMessages' />
        </span>,
        id: 'toolbar_button_chat',
        onClick() {
            JitsiMeetJS.analytics.sendEvent('toolbar.chat.toggled');
            APP.UI.emitEvent(UIEvents.TOGGLE_CHAT);
        },
        shortcut: 'C',
        shortcutAttr: 'toggleChatPopover',
        shortcutFunc() {
            JitsiMeetJS.analytics.sendEvent('shortcut.chat.toggled');
            APP.UI.toggleChat();
        },
        shortcutDescription: 'keyboardShortcuts.toggleChat',
        sideContainerId: 'chat_container',
        tooltipKey: 'toolbar.chat'
    },

    /**
     * The descriptor of the contact list toolbar button.
     */
    contacts: {
        classNames: [ 'button', 'icon-contactList' ],
        enabled: true,

        // XXX: Hotfix to solve race condition between toolbox rendering and
        // contact list view that updates the number of active participants
        // via jQuery. There is case when contact list view updates number of
        // participants but toolbox has not been rendered yet. Since this issue
        // is reproducible only for conferences with the only participant let's
        // use 1 participant as a default value for this badge. Later after
        // reactification of contact list let's use the value of active
        // paricipants from Redux store.
        html: <span className = 'badge-round'>
            <span id = 'numberOfParticipants'>1</span>
        </span>,
        id: 'toolbar_contact_list',
        onClick() {
            JitsiMeetJS.analytics.sendEvent(
                'toolbar.contacts.toggled');
            APP.UI.emitEvent(UIEvents.TOGGLE_CONTACT_LIST);
        },
        sideContainerId: 'contacts_container',
        tooltipKey: 'bottomtoolbar.contactlist'
    },

    /**
     * The descriptor of the desktop sharing toolbar button.
     */
    desktop: {
        classNames: [ 'button', 'icon-share-desktop' ],
        enabled: true,
        id: 'toolbar_button_desktopsharing',
        onClick() {
            if (APP.conference.isSharingScreen) {
                JitsiMeetJS.analytics.sendEvent('toolbar.screen.disabled');
            } else {
                JitsiMeetJS.analytics.sendEvent('toolbar.screen.enabled');
            }
            APP.UI.emitEvent(UIEvents.TOGGLE_SCREENSHARING);
        },
        shortcut: 'D',
        shortcutAttr: 'toggleDesktopSharingPopover',
        shortcutFunc() {
            JitsiMeetJS.analytics.sendEvent('shortcut.screen.toggled');
            APP.conference.toggleScreenSharing();
        },
        shortcutDescription: 'keyboardShortcuts.toggleScreensharing',
        tooltipKey: 'toolbar.sharescreen'
    },

    /**
     * The descriptor of the dialpad toolbar button.
     */
    dialpad: {
        classNames: [ 'button', 'icon-dialpad' ],
        enabled: true,

        // TODO: remove it after UI.updateDTMFSupport fix
        hidden: true,
        id: 'toolbar_button_dialpad',
        onClick() {
            JitsiMeetJS.analytics.sendEvent('toolbar.sip.dialpad.clicked');
        },
        tooltipKey: 'toolbar.dialpad'
    },

    /**
     * The descriptor of the etherpad toolbar button.
     */
    etherpad: {
        classNames: [ 'button', 'icon-share-doc' ],
        enabled: true,
        hidden: true,
        id: 'toolbar_button_etherpad',
        onClick() {
            JitsiMeetJS.analytics.sendEvent('toolbar.etherpad.clicked');
            APP.UI.emitEvent(UIEvents.ETHERPAD_CLICKED);
        },
        tooltipKey: 'toolbar.etherpad'
    },

    /**
     * The descriptor of the toolbar button which toggles full-screen mode.
     */
    fullscreen: {
        classNames: [ 'button', 'icon-full-screen' ],
        enabled: true,
        id: 'toolbar_button_fullScreen',
        onClick() {
            JitsiMeetJS.analytics.sendEvent('toolbar.fullscreen.enabled');

            APP.UI.emitEvent(UIEvents.TOGGLE_FULLSCREEN);
        },
        shortcut: 'S',
        shortcutAttr: 'toggleFullscreenPopover',
        shortcutDescription: 'keyboardShortcuts.fullScreen',
        shortcutFunc() {
            JitsiMeetJS.analytics.sendEvent('shortcut.fullscreen.toggled');
            APP.UI.toggleFullScreen();
        },
        tooltipKey: 'toolbar.fullscreen'
    },

    /**
     * The descriptor of the toolbar button which hangs up the call/conference.
     */
    hangup: {
        classNames: [ 'button', 'icon-hangup', 'button_hangup' ],
        enabled: true,
        filmStripOnlyEnabled: true,
        id: 'toolbar_button_hangup',
        onClick() {
            JitsiMeetJS.analytics.sendEvent('toolbar.hangup');
            APP.UI.emitEvent(UIEvents.HANGUP);
        },
        tooltipKey: 'toolbar.hangup'
    },

    /**
     * The descriptor of the toolbar button which shows the invite user dialog.
     */
    invite: {
        classNames: [ 'button', 'icon-link' ],
        enabled: true,
        id: 'toolbar_button_link',
        onClick() {
            JitsiMeetJS.analytics.sendEvent('toolbar.invite.clicked');
            APP.UI.emitEvent(UIEvents.INVITE_CLICKED);
        },
        tooltipKey: 'toolbar.invite'
    },

    /**
     * The descriptor of the microphone toolbar button.
     */
    microphone: {
        classNames: [ 'button', 'icon-microphone' ],
        enabled: true,
        filmStripOnlyEnabled: true,
        id: 'toolbar_button_mute',
        onClick() {
            const sharedVideoManager = APP.UI.getSharedVideoManager();

            if (APP.conference.audioMuted) {
                // If there's a shared video with the volume "on" and we aren't
                // the video owner, we warn the user
                // that currently it's not possible to unmute.
                if (sharedVideoManager
                    && sharedVideoManager.isSharedVideoVolumeOn()
                    && !sharedVideoManager.isSharedVideoOwner()) {
                    APP.UI.showCustomToolbarPopup(
                        '#unableToUnmutePopup', true, 5000);
                } else {
                    JitsiMeetJS.analytics.sendEvent('toolbar.audio.unmuted');
                    APP.UI.emitEvent(UIEvents.AUDIO_MUTED, false, true);
                }
            } else {
                JitsiMeetJS.analytics.sendEvent('toolbar.audio.muted');
                APP.UI.emitEvent(UIEvents.AUDIO_MUTED, true, true);
            }
        },
        popups: [
            {
                className: 'loginmenu',
                dataAttr: 'toolbar.micMutedPopup',
                id: 'micMutedPopup'
            },
            {
                className: 'loginmenu',
                dataAttr: 'toolbar.unableToUnmutePopup',
                id: 'unableToUnmutePopup'
            },
            {
                className: 'loginmenu',
                dataAttr: 'toolbar.talkWhileMutedPopup',
                id: 'talkWhileMutedPopup'
            }
        ],
        shortcut: 'M',
        shortcutAttr: 'mutePopover',
        shortcutFunc() {
            JitsiMeetJS.analytics.sendEvent('shortcut.audiomute.toggled');
            APP.conference.toggleAudioMuted();
        },
        shortcutDescription: 'keyboardShortcuts.mute',
        tooltipKey: 'toolbar.mute'
    },

    /**
     * The descriptor of the profile toolbar button.
     */
    profile: {
        classNames: [ 'button' ],
        enabled: true,
        html: <img
            id = 'avatar'
            src = 'images/avatar2.png' />,
        id: 'toolbar_button_profile',
        onClick() {
            JitsiMeetJS.analytics.sendEvent('toolbar.profile.toggled');
            APP.UI.emitEvent(UIEvents.TOGGLE_PROFILE);
        },
        sideContainerId: 'profile_container',
        tooltipKey: 'profile.setDisplayNameLabel'
    },

    /**
     * The descriptor of the "Raise hand" toolbar button.
     */
    raisehand: {
        classNames: [ 'button', 'icon-raised-hand' ],
        enabled: true,
        id: 'toolbar_button_raisehand',
        onClick() {
            JitsiMeetJS.analytics.sendEvent('toolbar.raiseHand.clicked');
            APP.conference.maybeToggleRaisedHand();
        },
        shortcut: 'R',
        shortcutAttr: 'raiseHandPopover',
        shortcutDescription: 'keyboardShortcuts.raiseHand',
        shortcutFunc() {
            JitsiMeetJS.analytics.sendEvent('shortcut.raisehand.clicked');
            APP.conference.maybeToggleRaisedHand();
        },
        tooltipKey: 'toolbar.raiseHand'
    },

    /**
     * The descriptor of the recording toolbar button. Requires additional
     * initialization in the recording module.
     */
    recording: {
        classNames: [ 'button' ],
        enabled: true,

        // will be displayed once the recording functionality is detected
        hidden: true,
        id: 'toolbar_button_record',
        tooltipKey: 'liveStreaming.buttonTooltip'
    },

    /**
     * The descriptor of the settings toolbar button.
     */
    settings: {
        classNames: [ 'button', 'icon-settings' ],
        enabled: true,
        id: 'toolbar_button_settings',
        onClick() {
            JitsiMeetJS.analytics.sendEvent('toolbar.settings.toggled');
            APP.UI.emitEvent(UIEvents.TOGGLE_SETTINGS);
        },
        sideContainerId: 'settings_container',
        tooltipKey: 'toolbar.Settings'
    },

    /**
     * The descriptor of the "Share YouTube video" toolbar button.
     */
    sharedvideo: {
        classNames: [ 'button', 'icon-shared-video' ],
        enabled: true,
        id: 'toolbar_button_sharedvideo',
        onClick() {
            JitsiMeetJS.analytics.sendEvent('toolbar.sharedvideo.clicked');
            APP.UI.emitEvent(UIEvents.SHARED_VIDEO_CLICKED);
        },
        popups: [
            {
                className: 'loginmenu extendedToolbarPopup',
                dataAttr: 'toolbar.sharedVideoMutedPopup',
                dataAttrPosition: 'w',
                id: 'sharedVideoMutedPopup'
            }
        ],
        tooltipKey: 'toolbar.sharedvideo'
    },

    /**
     * The descriptor of the SIP call toolbar button.
     */
    sip: {
        classNames: [ 'button', 'icon-telephone' ],
        enabled: true,

        // Will be displayed once the SIP calls functionality is detected.
        hidden: true,
        id: 'toolbar_button_sip',
        onClick() {
            JitsiMeetJS.analytics.sendEvent('toolbar.sip.clicked');
            _showSIPNumberInput();
        },
        tooltipKey: 'toolbar.sip'
    }
};