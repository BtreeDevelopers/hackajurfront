<template>
    <div class="b-menu" ref="menuBase" v-click-outside="{
        handler: closeMenu,
        include: () => [...allChildren()],
    }">
        <div class="component" ref="activator" @click="showMenu = !showMenu">
            <slot></slot>
        </div>

        <div class="menu" :class="{ 'show-modal': showMenu }" :style="{ top: top + 'px', right: 0 }" ref="menuside" @click="() => {
            closeOnClick && closeMenu('teste');
        }
            ">
            <slot name="menu"></slot>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        show: Boolean,
        direction: {
            type: String,
            default: "bottom",
            validator(value) {
                return ["bottom", "right"].includes(value);
            },
        },
        closeOnClick: {
            default: true,
            type: Boolean,
        },
    },
    mounted() {
        window.addEventListener(
            "resize",
            () => {
                if (this.showMenu) {
                    this.calcTop();
                    this.calcLeft();
                }
            },
            true
        );
    },
    data: () => ({
        showMenu: false,
        function: new Function(),
        top: 0,
        left: 0,
    }),
    // beforeMount() {
    //   this.function = (e) => {
    //     console.log(this.searchChildren(this.$el.children), e.target);
    //     if (
    //       !this.searchChildren(this.$el.children).some((el) =>
    //         el.contains(e.target)
    //       )
    //     ) {
    //       console.log("aqui");
    //       this.closeMenu();
    //     }
    //   };
    //   window.addEventListener("click", this.function);
    // },
    // beforeUnmount() {
    //   window.removeEventListener("click", this.function);
    // },
    watch: {
        show: {
            handler(val) {
                this.showMenu = val;
            },
            immediate: true,
        },
        showMenu: {
            handler(val) {
                this.$emit("update:show", val);
                if (val) {
                    this.calcTop();
                    this.calcLeft();
                }
            },
            immediate: true,
        },
    },
    methods: {
        calcLeft() {
            this.$nextTick(() => {
                const activatorWidth = this.$refs.activator.clientWidth;
                const activatorTop = this.$refs.activator.getBoundingClientRect().left;
                const sizeEl = this.$refs.menuside.clientWidth;
                const screenSize = document.querySelector("body").clientWidth;
                const calc = activatorTop + activatorWidth + sizeEl + screenSize * 0.02;
                this.left = 0;
                if (this.direction === "right") {
                    this.left = activatorWidth;
                    if (calc > screenSize) {
                        this.left = this.left + screenSize - calc;
                    }
                } else {
                    const newCalc = calc - activatorWidth;
                    if (newCalc > screenSize) {
                        this.left = screenSize - newCalc;
                    }
                }
            });
        },
        calcTop() {
            this.$nextTick(() => {
                const activatorHeight = this.$refs.activator.clientHeight;
                const activatorTop = this.$refs.activator.getBoundingClientRect().top;
                const sizeEl = this.$refs.menuside.clientHeight;
                const screenSize = document.querySelector("body").clientHeight;
                const calc =
                    activatorTop + activatorHeight + sizeEl + screenSize * 0.02;
                this.top = 0;
                if (this.direction === "bottom") {
                    this.top = activatorHeight;
                    if (calc > screenSize) {
                        this.top = this.top + screenSize - calc;
                    }
                } else {
                    const newCalc = calc - activatorHeight;
                    if (newCalc > screenSize) {
                        this.top = screenSize - newCalc;
                    }
                }
            });
        },
        allChildren() {
            if (!this.$el) return [];
            return this.searchChildren(this.$el.children);
        },
        searchChildren(children) {
            const results = [];
            for (let index = 0; index < children.length; index++) {
                const child = children[index];
                results.push(child);
                if (child.children.length) {
                    results.push(...this.searchChildren(child.children));
                }
            }

            return results;
        },
        closeMenu() {
            this.showMenu = false;
        },
    },
};
</script>
  
<style lang="scss">
.b-menu {
    position: relative;
    height: 100%;

    .menu {
        display: none;
        box-sizing: border-box;
        position: absolute;
        z-index: 5;

        &.show-modal {
            display: flex;
        }

        color: #000;
        margin-top: 2px;
        background: #FFF;
        border-radius: 6px;
        box-shadow: 0px 7.60456px 19.0114px rgba(0, 0, 0, 0.25);
        padding: 15px;
    }
}
</style>