<template>
    <div class="input-container">
      <input
        :id="id"
        :ref="inputRef"
        :type="computedInputType"
        :placeholder="placeholder"
        :required="required"
        :value="modelValue"
        @input="updateValue($event.target.value)"
      />

      <!-- Conditionally render the password toggle if type is 'password' -->
      <img
        v-if="type === 'password'"
        :src="isPasswordVisible ? eyeOpenIcon : eyeClosedIcon"
        @click="togglePasswordVisibility"
        class="password-toggle"
      />
    </div>
  </template>
  
  <script>
  import eyeOpenIcon from '@/assets/icons/eye-open.svg';
  import eyeClosedIcon from '@/assets/icons/eye-closed.svg';
  
  export default {
    props: {
      id: String,
      type: {
        type: String,
        default: 'text'
      },
      modelValue: String,
      placeholder: String,
      required: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isPasswordVisible: false, // Local state to track password visibility
        eyeOpenIcon, // Eye open icon for password visibility
        eyeClosedIcon // Eye closed icon for password visibility
      };
    },
    computed: {
      computedInputType() {
        // Using 'text' type when password visibility is toggled, else use provided type
        return this.type === 'password' && this.isPasswordVisible ? 'text' : this.type;
      },
      inputRef() {
      // Return the id if it's provided, otherwise return null
      return this.id ? this.id : null;
    }
    },
    methods: {
      togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
      this.$nextTick(() => {
        if (this.inputRef && this.$refs[this.inputRef]) {
          this.$refs[this.inputRef].focus();
        }
      });
    },
    updateValue(value) {
      this.$emit('update:modelValue', value); // Emit event for v-model binding to parent component
    },
    },
  };
  </script>
  <style scoped>
.input-container {
  margin-bottom: 1rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

input {
  width: 100%;
  font-family: 'Asap Regular', sans-serif; 
  font-size: 1.25rem; 
  color: #303030;
  padding: 0.8rem;
  border: 1px solid white;
  border-radius: 10px;
  outline: none; /* remove the default focus outline */
}

input:focus {
  border: 1px solid #303030; /* subtle border for focus */
}

  
.password-toggle {
  cursor: pointer;
  position: absolute;
  right: 1rem; 
  top: 50%;
  transform: translateY(-45%);
}
  

  </style>
  