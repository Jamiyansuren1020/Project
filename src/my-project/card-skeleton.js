import React from "react";
import Skeleton from "react-loading-skeleton";

export default function SkeletonCard(cards) {
    return(
        Array(cards).fill(0).map((item) => {
            return(
            <div className="card-skeleton">
                <div className="card-left-col">
                {/* <Skeleton/> */}
                </div>
                <div className="card-right-col">
                {/* <Skeleton/> */}
                </div>
            </div>
            )
        })
       
    )
}