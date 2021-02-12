<template>
    <div class="q-pa-md q-mt-xl">
        <q-card class="my-card" style="width:500px">
            <q-card-section>
                <div class="row justify-center">
                    <div class="col-1">
                        <q-icon name="thumb_down" class="text-primary" style="font-size: 32px;"/>
                    </div>
                    <div class="col-11 text-primary text-h6"> Complaint</div>
                </div>
                <div class="row q-pa-md">
                    <div class="text-h5"> {{object.complaintText}} </div>
                </div>
            </q-card-section>
            <q-separator></q-separator>
            <q-card-actions align="center">
                <q-btn unelevated  @click="response = true" color="primary" class="full-width text-white" label="Give response" />
            </q-card-actions>
        </q-card>

        <q-dialog v-model="response">
            <q-card class="my-card" style="width:500px">
                <q-card-section>
                    <div class="row justify-center text-primary text-bold text-h5">Write your response</div>
                </q-card-section>
                <q-separator></q-separator>
                <div class="col-xs-12 col-sm-12 col-md-12 q-pa-md">
                    <q-input
                        v-model="respText"
                        filled
                        clearable
                        type="textarea"
                    />
                </div>
                <q-separator></q-separator>
                <q-card-actions align="center">
                <q-btn unelevated  @click="sendResponse" color="primary" class="full-width text-white" label="Send response" />
            </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import ComplaintService from './../services/ComplaintService'
export default {
  props: ['object'],
  data () {
    return {
      response: false,
      respText: ''
    }
  },
  methods: {
    sendResponse () {
      var data = {
        complaintId: this.object.complaintId,
        complaintResponse: this.respText
      }
      var res = ComplaintService.responseComplaint(data)
      this.response = false
    }
  }
}
</script>
