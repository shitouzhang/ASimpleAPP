/**
 * Created by Roc on 2017/4/7.
 */

import React, { Component } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';


export default class DropDownPanel extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            heightAnim: new Animated.Value(0),
            opacityAnim: new Animated.Value(0)
        };
    }

    static propTypes = {
        visible: PropTypes.bool,
        onClose: PropTypes.func,
        top: PropTypes.number,
        height: PropTypes.number,
        customStyle: PropTypes.any,
    };


    componentWillReceiveProps(nextProps) {
        if (nextProps.visible && nextProps.height !== 0) {
            this._startAnimated(nextProps.height);
        }
    }

    render() {
        if (!this.props.visible) {
            return null;
        }

        const { children, onClose, top, customStyle } = this.props;
        let topStyle;
        topStyle = top ? { top: top } : null;
        return (
            <TouchableWithoutFeedback onPress={onClose} onLayout={this._startAnimated.bind(this)}>
                <Animated.View style={[styles.container, { opacity: this.state.opacityAnim }, topStyle]}>
                    <TouchableWithoutFeedback>
                        <Animated.View style={[styles.content, { height: this.state.heightAnim }, customStyle]}>
                            {children}
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </Animated.View>
            </TouchableWithoutFeedback>
        )
    }

    _startAnimated(height) {
        if (typeof height !== 'number') {
            height = this.props.height;
        }

        Animated.parallel([
            Animated.spring(this.state.opacityAnim, {
                toValue: 1
            }),
            Animated.spring(this.state.heightAnim, {
                toValue: height || 150
            }),
        ]).start();
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex:99
    },
    content: {
        backgroundColor: '#fff',
        overflow: 'hidden'
    }
});
