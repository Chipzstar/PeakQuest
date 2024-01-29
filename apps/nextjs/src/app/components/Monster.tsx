import React, {CSSProperties, FC} from 'react';

interface Props {
    src: string;
    position: {
        x: number | string;
        y: number | string;
    };
    size?: {
        width: number | string;
        height: number | string;
    }
    classNames?: string;
}

const Monster: FC<Props> = ({src, position, size={width: 100, height: 100}, classNames=""}: Props) => {

    const style: CSSProperties = {
        position: 'absolute',
        top: `${position.y}%`,
        left: `${position.x}%`,
        width: `${size.width}`,
        height: `${size.height}`
    };

    return <img src={src} alt="Monster" style={style} className={classNames}/>;
};

export default Monster;
