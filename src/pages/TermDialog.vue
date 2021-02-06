<template>
<q-dialog
    v-model="modalIsOpen"
    class="NOcalendar-event-detail"
    @hide="__close()"
    @escape-key="__close()"
  >

    <q-card class="calendar-event-detail">
      <q-toolbar>
        <q-toolbar-title>
          <!--{{ eventObject.summary }}-->
        </q-toolbar-title>

        <div class="ced-close-button-left-spacer"></div>
        <q-btn
          flat
          round
          dense
          icon="close"
          v-close-popup
        />
      </q-toolbar>

      <q-card-section class="ced-q-card-main">
        <div class="ced-content">
          <q-list no-border>

            <!-- title -->
            <q-item>
              <!-- left side color bar -->
              <q-item-section
                avatar
                class="ced-avatar-column"
              >
                <div class="bg-primary" style="height:100%;width:100%">  </div>
              </q-item-section>
              <q-item-section>
                <div
                  v-if="false"
                  class="ced-top-title ced-event-title"
                >
                  <q-input
                    v-model="editEventObject.summary"
                    label="Summary"
                    stack-label
                    filled
                    bottom-slots
                  />
                </div>
                <div
                  v-else
                  class="ced-event-title"
                >
                  {{ eventObject.summary }}
                </div>

                <!-- date/time edit mode -->
                <!-- date/time display mode -->
                <div >
                  <div
                    class="ced-list-title"
                  >
                    {{ eventObject.start.dateTime }}
                    <template
                    >
                      -
                      {{ eventObject.end.dateTime }}
                    </template>
                  </div>
                  <div
                    class="ced-list-subtitle"
                  >
                    {{ eventObject.start.dateTime }}
                    -
                    {{eventObject.end.dateTime}}
                  </div>
                </div>

                <!-- date / time -->
              </q-item-section>
            </q-item>

            <!-- location -->
            <q-item >
              <q-item-section avatar>
                <q-icon
                  name="location_on"
                  :color="eventColor"
                />
              </q-item-section>
              <q-item-section class="ced-list-title">
               {{eventObject.location}}
              </q-item-section>
            </q-item>

            <!-- resources -->

            <!-- attendees -->
            <q-item
              multiline
            >
              <q-item-section avatar>
                <div class="relative-position ced-icon-div-with-badge">
                  <q-icon
                    name="people"
                    :color="eventColor"
                  >
                  </q-icon>
                </div>
              </q-item-section>
              <q-item-section class="ced-list-title">
                <!-- guest list -->
                <div class="flex-row">
                <template
                  v-for="thisAttendee in eventObject.attendees"
                >
                  <q-chip
                    :key="thisAttendee.id"
                  >
                    <q-avatar icon="person" :color="eventColor" />
                    <template v-if="thisAttendee.displayName && thisAttendee.displayName.length > 0">
                      {{ thisAttendee.displayName }}
                    </template>
                    <template v-else>
                      {{ thisAttendee.email }}
                    </template>
                  </q-chip>
                </template>
                </div>

              </q-item-section>
            </q-item>

            <!-- mail -->
            <q-item
              v-if="true"
            >
              <q-item-section avatar>
                <q-icon
                  name="email"
                  color="primary"
                />
              </q-item-section>
              <q-item-section>
                    {{ eventObject.attendees[0].email }}
              </q-item-section>
            </q-item>

            <!-- description -->
            <q-item >
              <q-item-section>
                <template >
                  <q-btn color="primary">Start schedule/counseling</q-btn>
                </template>
              </q-item-section>
            </q-item>

          </q-list>
        </div>

        <!-- editing close buttons -->
        <div
          v-if="false"
          class="flex-row flex-justify-end q-pa-md q-gutter-sm"
        >
          <div>
            <q-btn
              :color="eventColor"
              icon="cancel"
              label="Cancel"
              flat
              @click="__close()"
            />
          </div>
          <div>
            <q-btn
              :color="eventColor"
              icon="check"
              label="Save"
              flat
              @click="__save()"
            />
          </div>

        </div>
      </q-card-section>

    </q-card>

  </q-dialog>
  </template>

<script>
export default {
  data () {
    return {
      eventObject: {
        id: 1,
        summary: 'Test event',
        description: 'Some extra info goes here',
        location: 'Office of the Divine Randomness, 1232 Main St., Denver, CO',
        start: {
          dateTime: '2021-02-16T14:00:00', // ISO 8601 formatted
          timeZone: 'America/New_York' // Timezone listed as a separate IANA code
        },
        end: {
          dateTime: '2021-02-16T16:30:00',
          timeZone: 'American/New_York'
        },
        color: 'positive',
        attendees: [
          {
            id: 5,
            email: 'somebody@somewhere.com',
            displayName: 'John Q. Public',
            organizer: false,
            self: false,
            resource: false
          }
        ]
      },
      modalIsOpen: true,
      eventColor: 'primary'
    }
  }
}
</script>
<style lang="stylus">
  @import '~@daykeep/calendar-core/component/calendar/styles-common/calendar.vars.styl'
  $topSidePadding = 16px
  $listSideItemWidth = 38px
  $listSideItemSpace = 10px
  $forcedLeftMargin = $topSidePadding + $listSideItemWidth + $listSideItemSpace
  .calendar-event-detail
    max-width 80vw !important
    .ced-icon-div-with-badge
      padding-right 5px
      padding-top 5px
    .ced-close-button-left-spacer
      width 16px
    .ced-event-title
      font-size 1.5em
      font-weight 500
    .ced-list-title
      font-size 1em
    .ced-list-subtitle
      font-size .8em
      opacity 0.8
    .ced-q-card-main
      padding-top 0
    .ced-avatar-column
      min-width 40px
      margin-right 16px
    .ced-top
      /*padding .25em 0 1em*/
      .ced-top-title
        font-size 1.25em
        margin-left $forcedLeftMargin
        .ced-toolbar-edit-spacer
          min-height 1em
          height 1em
      .ced-edit-button-container
        position relative
        .ced-edit-button
          position absolute
          left 8px
          bottom -32px
    .ced-content
      font-size 1em
      .ced-edit-button-content-spacer
        min-height 1em
        height 1em
    .ced-nested-item
      padding-left 0
    .ced-small-inverted-icon
      font-size 20px
      padding 2px
      border-radius 50%
      min-width 24px
      .q-item-icon-inverted
        background $grey-4
</style>
